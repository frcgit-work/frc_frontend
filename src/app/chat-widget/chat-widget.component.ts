import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/shared/news.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { FaqChatService, FaqCategory } from './faq-chat.service';
import { FaqRecord } from './faq-data';

type MessageRole = 'assistant' | 'user';

interface ChatMessage {
  role: MessageRole;
  text: string;
  relatedNews?: SiteNewsItem[];
  relatedNewsLabel?: string;
  suggestedFaqs?: FaqRecord[];
  newsLoading?: boolean;
  newsError?: boolean;
}

interface SiteNewsItem {
  iDs: number | string;
  subject: string;
  ognoo?: string;
}

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('messagesViewport') private messagesViewport?: ElementRef<HTMLDivElement>;

  readonly categories: FaqCategory[];
  readonly messengerUrl: string;
  isOpen = false;
  selectedCategory: string | null = null;
  showQuestionPicker = true;
  questionDraft = '';
  messages: ChatMessage[] = [];
  private lastSubmittedQuestion = '';
  private shouldScroll = false;
  private newsRequestVersion = 0;

  constructor(
    private readonly faqChatService: FaqChatService,
    private readonly newsService: NewsService,
    private readonly language: LanguageService
  ) {
    this.categories = faqChatService.categories;
    this.messengerUrl = faqChatService.messengerUrl;
    this.startNewChat();
  }

  get activeQuestions(): FaqRecord[] {
    return this.selectedCategory
      ? this.faqChatService.questionsForCategory(this.selectedCategory)
      : [];
  }

  ngAfterViewChecked(): void {
    const viewport = this.messagesViewport?.nativeElement;
    if (this.shouldScroll && viewport) {
      viewport.scrollTop = viewport.scrollHeight;
      this.shouldScroll = false;
    }
  }

  openChat(): void {
    this.isOpen = true;
  }

  closeChat(): void {
    this.isOpen = false;
  }

  startNewChat(): void {
    this.newsRequestVersion += 1;
    this.selectedCategory = null;
    this.showQuestionPicker = true;
    this.questionDraft = '';
    this.lastSubmittedQuestion = '';
    this.messages = [
      {
        role: 'assistant',
        text: 'Сайн байна уу! Түгээмэл асуултаас сонгох эсвэл асуух зүйлээ доор бичнэ үү.',
      },
    ];
    this.shouldScroll = true;
  }

  selectCategory(category: string): void {
    this.selectedCategory = category;
    this.showQuestionPicker = true;
    this.messages = [...this.messages, { role: 'user', text: category }];
    this.shouldScroll = true;
  }

  showCategories(): void {
    this.selectedCategory = null;
    this.showQuestionPicker = true;
    this.shouldScroll = true;
  }

  showQuestions(): void {
    this.showQuestionPicker = true;
    this.shouldScroll = true;
  }

  selectQuestion(faq: FaqRecord): void {
    this.selectedCategory = faq.category;
    this.showQuestionPicker = false;
    this.messages = [
      ...this.messages,
      { role: 'user', text: faq.question },
      { role: 'assistant', text: this.faqChatService.answerFor(faq), newsLoading: true },
    ];
    this.lastSubmittedQuestion = faq.question;
    this.loadRelatedNews(this.messages.length - 1, faq.question, faq);
    this.shouldScroll = true;
  }

  submitQuestion(): void {
    const question = this.questionDraft.trim();
    if (!question) {
      return;
    }

    this.questionDraft = '';
    this.lastSubmittedQuestion = question;
    this.selectedCategory = null;
    this.showQuestionPicker = false;
    this.messages = [...this.messages, { role: 'user', text: question }];

    const matches = this.faqChatService.findMatches(question);
    const bestMatch = matches[0];
    const secondMatch = matches[1];
    const hasEnoughTerms = this.faqChatService.searchableTokenCount(question) > 1;
    const isConfidentMatch = Boolean(
      bestMatch &&
        hasEnoughTerms &&
        bestMatch.score >= 0.56 &&
        (bestMatch.score - (secondMatch?.score || 0) >= 0.12 ||
          (bestMatch.exactQuestionMatch && !secondMatch?.exactQuestionMatch))
    );

    let response: ChatMessage;
    if (bestMatch && isConfidentMatch) {
      response = {
        role: 'assistant',
        text: this.faqChatService.answerFor(bestMatch.faq),
        newsLoading: true,
      };
    } else if (bestMatch && bestMatch.score >= 0.2) {
      response = {
        role: 'assistant',
        text: 'Таны асуулттай ойролцоо түгээмэл асуултууд байна. Тохирох асуултаа сонгоно уу.',
        suggestedFaqs: matches.map((match) => match.faq),
        newsLoading: true,
      };
    } else {
      this.showQuestionPicker = true;
      response = {
        role: 'assistant',
        text: 'Түгээмэл асуултаас тохирох хариулт олдсонгүй. Өөр үгээр асуух эсвэл доорх ангиллаас хайж үзнэ үү.',
        newsLoading: true,
      };
    }

    this.messages = [...this.messages, response];
    this.loadRelatedNews(this.messages.length - 1, question, isConfidentMatch ? bestMatch?.faq : undefined);
    this.shouldScroll = true;
  }

  submitOnEnter(event: KeyboardEvent): void {
    if (event.shiftKey) {
      return;
    }

    event.preventDefault();
    this.submitQuestion();
  }

  handoffToMessenger(): void {
    const draftQuestion = this.questionDraft.trim();
    const question = draftQuestion || this.lastSubmittedQuestion;
    if (!question) {
      return;
    }

    if (draftQuestion) {
      this.messages = [...this.messages, { role: 'user', text: question }];
      this.questionDraft = '';
      this.lastSubmittedQuestion = question;
    }
    this.messages = [...this.messages, { role: 'assistant', text: 'Асуултыг Messenger рүү дамжуулахад бэлдэж байна...' }];
    this.shouldScroll = true;

    const statusIndex = this.messages.length - 1;
    const conversationVersion = this.newsRequestVersion;
    const copiedMessage = 'Асуулт санах ойд хуулагдлаа. Messenger дээр буулган илгээнэ үү.';
    const manualCopyMessage = 'Асуулт чатанд үлдлээ. Messenger нээгдэхэд дээрх асуултыг хуулж буулган илгээнэ үү.';

    try {
      if (!navigator.clipboard?.writeText) {
        this.updateHandoffStatus(statusIndex, conversationVersion, manualCopyMessage);
        return;
      }

      navigator.clipboard.writeText(question).then(
        () => this.updateHandoffStatus(statusIndex, conversationVersion, copiedMessage),
        () => this.updateHandoffStatus(statusIndex, conversationVersion, manualCopyMessage)
      );
    } catch {
      this.updateHandoffStatus(statusIndex, conversationVersion, manualCopyMessage);
    }
  }

  private updateHandoffStatus(index: number, conversationVersion: number, text: string): void {
    if (conversationVersion !== this.newsRequestVersion || !this.messages[index]) {
      return;
    }

    this.messages[index] = { ...this.messages[index], text };
    this.shouldScroll = true;
  }

  private loadRelatedNews(messageIndex: number, query: string, faq?: FaqRecord): void {
    const lang = this.language.loadLang.getValue() === 'en' ? 'en' : 'mn';
    const menuId = lang === 'mn' ? 61 : 616;
    const requestVersion = this.newsRequestVersion;
    const searchText = `${query} ${faq?.question || ''} ${faq?.category || ''}`;

    this.newsService.newslist(menuId, { site: 'main', lang }).subscribe({
      next: (items: SiteNewsItem[]) => {
        if (requestVersion !== this.newsRequestVersion) {
          return;
        }

        const newsItems = Array.isArray(items) ? items : [];
        const relatedNews = newsItems
          .map((item) => ({ item, score: this.faqChatService.relevanceScore(searchText, item.subject || '') }))
          .filter((entry) => entry.score > 0)
          .sort((a, b) => b.score - a.score)
          .slice(0, 3)
          .map((entry) => entry.item);
        const recommendations = relatedNews.length ? relatedNews : newsItems.slice(0, 2);
        this.messages[messageIndex] = {
          ...this.messages[messageIndex],
          relatedNews: recommendations,
          relatedNewsLabel: relatedNews.length ? 'Тантай холбоотой мэдээ' : 'Сайтын сүүлийн мэдээ',
          newsLoading: false,
          newsError: !recommendations.length,
        };
        this.shouldScroll = true;
      },
      error: () => {
        if (requestVersion !== this.newsRequestVersion) {
          return;
        }

        this.messages[messageIndex] = {
          ...this.messages[messageIndex],
          relatedNews: [],
          newsLoading: false,
          newsError: true,
        };
        this.shouldScroll = true;
      },
    });
  }
}
