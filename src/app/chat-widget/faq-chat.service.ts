import { Injectable } from '@angular/core';
import { FAQ_RECORDS, FaqRecord } from './faq-data';

export interface FaqCategory {
  name: string;
  questionCount: number;
}

@Injectable({ providedIn: 'root' })
export class FaqChatService {
  readonly messengerUrl = 'https://m.me/MongoliaFRC';

  private readonly faqRecords = FAQ_RECORDS;

  get categories(): FaqCategory[] {
    const counts = new Map<string, number>();
    this.faqRecords.forEach((faq) => {
      counts.set(faq.category, (counts.get(faq.category) || 0) + 1);
    });

    return Array.from(counts.entries()).map(([name, questionCount]) => ({
      name,
      questionCount,
    }));
  }

  questionsForCategory(category: string): FaqRecord[] {
    return this.faqRecords.filter((faq) => faq.category === category);
  }

  answerFor(faq: FaqRecord): string {
    if (faq.status === 'draft' && faq.answer.trim()) {
      return faq.answer;
    }

    return 'Энэ асуултын хариулт Excel-д хараахан бөглөгдөөгүй эсвэл нягталж дуусаагүй байна. Ажилтантай Messenger-ээр холбогдоно уу.';
  }
}
