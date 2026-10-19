import { AfterViewChecked, Component, ElementRef, ViewChild } from '@angular/core';
import { FaqChatService, RelatedContent } from './faq-chat.service';

type MessageRole = 'assistant' | 'user';

interface ChatMessage {
  role: MessageRole;
  text: string;
  relatedContent?: RelatedContent;
}

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
})
export class ChatWidgetComponent implements AfterViewChecked {
  @ViewChild('messagesViewport') private messagesViewport?: ElementRef<HTMLDivElement>;

  readonly suggestedQuestions: string[];
  isOpen = false;
  draft = '';
  isTyping = false;
  messages: ChatMessage[] = [];
  private shouldScroll = false;
  private replyTimer?: number;

  constructor(private readonly faqChatService: FaqChatService) {
    this.suggestedQuestions = faqChatService.suggestedQuestions;
    this.startNewChat();
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
    if (this.replyTimer !== undefined) {
      window.clearTimeout(this.replyTimer);
      this.replyTimer = undefined;
    }
    this.draft = '';
    this.isTyping = false;
    this.messages = [
      {
        role: 'assistant',
        text: 'Сайн байна уу! Түгээмэл асуултаас сонгох эсвэл асуултаа бичээрэй.',
      },
    ];
    this.shouldScroll = true;
  }

  send(question = this.draft): void {
    const text = question.trim();
    if (!text || this.isTyping) {
      return;
    }

    this.messages = [...this.messages, { role: 'user', text }];
    this.draft = '';
    this.isTyping = true;
    this.shouldScroll = true;

    this.replyTimer = window.setTimeout(() => {
      const reply = this.faqChatService.findReply(text);
      this.messages = [
        ...this.messages,
        {
          role: 'assistant',
          text: reply.answer,
          relatedContent: reply.relatedContent,
        },
      ];
      this.isTyping = false;
      this.replyTimer = undefined;
      this.shouldScroll = true;
    }, 450);
  }
}
