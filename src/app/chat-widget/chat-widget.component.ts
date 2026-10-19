import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/shared/news.service';
import { LanguageService } from 'src/app/shared/service/language.service';
import { FaqChatService, FaqCategory } from './faq-chat.service';
import { FaqRecord } from './faq-data';

type MessageRole = 'assistant' | 'user';

interface ChatMessage {
  role: MessageRole;
  text: string;
  relatedNews?: SiteNewsItem | null;
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
  messages: ChatMessage[] = [];
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
    this.messages = [
      {
        role: 'assistant',
        text: 'Сайн байна уу! Түгээмэл асуултын ангилал сонгоод, асуултаа товшино уу.',
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
    this.messages = [
      ...this.messages,
      { role: 'user', text: faq.question },
      { role: 'assistant', text: this.faqChatService.answerFor(faq), newsLoading: true },
    ];
    this.showQuestionPicker = false;
    this.loadLatestNews(this.messages.length - 1);
    this.shouldScroll = true;
  }

  private loadLatestNews(messageIndex: number): void {
    const lang = this.language.loadLang.getValue() === 'en' ? 'en' : 'mn';
    const menuId = lang === 'mn' ? 61 : 616;
    const requestVersion = this.newsRequestVersion;

    this.newsService.newslist(menuId, { site: 'main', lang }).subscribe({
      next: (items: SiteNewsItem[]) => {
        if (requestVersion !== this.newsRequestVersion) {
          return;
        }

        const relatedNews = Array.isArray(items) ? items[0] || null : null;
        this.messages[messageIndex] = {
          ...this.messages[messageIndex],
          relatedNews,
          newsLoading: false,
          newsError: !relatedNews,
        };
        this.shouldScroll = true;
      },
      error: () => {
        if (requestVersion !== this.newsRequestVersion) {
          return;
        }

        this.messages[messageIndex] = {
          ...this.messages[messageIndex],
          newsLoading: false,
          newsError: true,
        };
        this.shouldScroll = true;
      },
    });
  }
}
