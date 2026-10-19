import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FaqChatService, FaqCategory } from './faq-chat.service';
import { FaqRecord } from './faq-data';

type MessageRole = 'assistant' | 'user';

interface ChatMessage {
  role: MessageRole;
  text: string;
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

  constructor(private readonly faqChatService: FaqChatService) {
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
      { role: 'assistant', text: this.faqChatService.answerFor(faq) },
    ];
    this.showQuestionPicker = false;
    this.shouldScroll = true;
  }
}
