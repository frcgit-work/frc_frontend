import { Injectable } from '@angular/core';
import { FAQ_RECORDS, FaqRecord } from './faq-data';

export interface FaqCategory {
  name: string;
  questionCount: number;
}

export interface FaqSearchResult {
  faq: FaqRecord;
  score: number;
}

@Injectable({ providedIn: 'root' })
export class FaqChatService {
  readonly messengerUrl = 'https://www.messenger.com/t/706746946020404';

  private readonly faqRecords = FAQ_RECORDS;
  private readonly searchStopWords = new Set([
    'ба', 'бол', 'нь', 'юм', 'вэ', 'бэ', 'уу', 'үү', 'юу', 'байна', 'байдаг',
    'байх', 'болох', 'гэсэн', 'гэдэг', 'энэ', 'тэр', 'та', 'таны', 'би', 'миний',
    'л', 'дээ', 'шүү', 'ын', 'ийн', 'ний', 'ны', 'ийг', 'ыг', 'д', 'т',
  ]);

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

  search(question: string, limit = 3): FaqSearchResult[] {
    const queryTokens = this.searchTokens(question);
    if (!queryTokens.length) {
      return [];
    }

    const normalizedQuery = this.normalize(question);
    return this.faqRecords
      .map((faq) => ({ faq, score: this.scoreQuestion(queryTokens, normalizedQuery, faq.question) }))
      .filter((result) => result.score >= 0.2)
      .sort((left, right) => right.score - left.score)
      .slice(0, limit);
  }

  isConfidentMatch(question: string, result: FaqSearchResult): boolean {
    if (this.normalize(question) === this.normalize(result.faq.question)) {
      return true;
    }

    return this.searchTokens(question).length >= 2 && result.score >= 0.58;
  }

  answerFor(faq: FaqRecord): string {
    if (faq.status !== 'needs_review' && faq.answer.trim()) {
      return faq.answer;
    }

    return 'Энэ асуултын хариулт Excel-д хараахан бөглөгдөөгүй эсвэл нягталж дуусаагүй байна. Ажилтантай Messenger-ээр холбогдоно уу.';
  }

  private scoreQuestion(queryTokens: string[], normalizedQuery: string, faqQuestion: string): number {
    const questionTokens = this.searchTokens(faqQuestion);
    if (!questionTokens.length) {
      return 0;
    }

    const queryCoverage = queryTokens.reduce((sum, token) => {
      return sum + Math.max(...questionTokens.map((candidate) => this.tokenSimilarity(token, candidate)));
    }, 0) / queryTokens.length;
    const questionCoverage = questionTokens.reduce((sum, token) => {
      return sum + Math.max(...queryTokens.map((candidate) => this.tokenSimilarity(token, candidate)));
    }, 0) / questionTokens.length;
    const phraseBonus = normalizedQuery && this.normalize(faqQuestion).includes(normalizedQuery) ? 0.12 : 0;

    return Math.min(1, queryCoverage * 0.72 + questionCoverage * 0.28 + phraseBonus);
  }

  private searchTokens(value: string): string[] {
    return this.normalize(value)
      .split(' ')
      .filter((token) => token.length > 1 && !this.searchStopWords.has(token));
  }

  private normalize(value: string): string {
    return value
      .toLocaleLowerCase()
      .replace(/[^a-zа-яёөүһңҗ0-9]+/gi, ' ')
      .trim()
      .replace(/\s+/g, ' ');
  }

  private tokenSimilarity(left: string, right: string): number {
    const leftRoot = this.stem(left);
    const rightRoot = this.stem(right);
    if (leftRoot === rightRoot) {
      return 1;
    }

    if (leftRoot.length >= 4 && rightRoot.length >= 4 &&
      (leftRoot.startsWith(rightRoot) || rightRoot.startsWith(leftRoot))) {
      return 0.86;
    }

    return 0;
  }

  private stem(token: string): string {
    const suffixes = [
      'уудаар', 'үүдээр', 'уудын', 'үүдийн', 'уудыг', 'үүдийг', 'аас', 'ээс', 'оос', 'өөс',
      'аар', 'ээр', 'оор', 'өөр', 'тай', 'тэй', 'той', 'ууд', 'үүд', 'ийн', 'ний', 'ны',
      'ыг', 'ийг', 'ын', 'ий', 'ы', 'д', 'т', 'г', 'н',
    ];
    const suffix = suffixes.find((ending) => token.endsWith(ending) && token.length - ending.length >= 3);
    return suffix ? token.slice(0, -suffix.length) : token;
  }
}
