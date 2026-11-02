import { Injectable } from '@angular/core';
import { FAQ_RECORDS, FaqRecord } from './faq-data';

export interface FaqCategory {
  name: string;
  questionCount: number;
}

export interface FaqSearchMatch {
  faq: FaqRecord;
  score: number;
  exactQuestionMatch: boolean;
}

@Injectable({ providedIn: 'root' })
export class FaqChatService {
  readonly messengerUrl = 'https://www.messenger.com/t/706746946020404';

  private readonly faqRecords = FAQ_RECORDS;
  private readonly ignoredWords = new Set([
    'ба',
    'бол',
    'байна',
    'байдаг',
    'байгаа',
    'вэ',
    'бэ',
    'уу',
    'үү',
    'нь',
    'та',
    'таны',
    'би',
    'миний',
    'ямар',
    'яаж',
    'хэрхэн',
    'хаана',
    'талаар',
    'холбоотой',
    'гэж',
    'гэсэн',
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

  findMatches(question: string, limit = 3): FaqSearchMatch[] {
    const queryTokens = this.tokens(question).filter((token) => !this.ignoredWords.has(token));
    if (!queryTokens.length) {
      return [];
    }

    const normalizedQuestion = this.normalize(question);
    return this.faqRecords
      .map((faq) => {
        const searchableQuestion = this.normalize(`${faq.question} ${faq.category}`);
        const candidateTokens = this.tokens(searchableQuestion);
        const score = queryTokens.reduce((total, token) => {
          const match = this.tokenMatch(token, candidateTokens);
          return total + match;
        }, 0) / queryTokens.length;
        const exactPhraseBonus = searchableQuestion.includes(normalizedQuestion) ? 1 : 0;

        return {
          faq,
          score: exactPhraseBonus || score,
          exactQuestionMatch: exactPhraseBonus > 0,
        };
      })
      .filter((match) => match.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);
  }

  relevanceScore(query: string, candidate: string): number {
    const queryTokens = this.tokens(query).filter((token) => !this.ignoredWords.has(token));
    const candidateTokens = this.tokens(candidate);
    if (!queryTokens.length || !candidateTokens.length) {
      return 0;
    }

    return queryTokens.reduce((total, token) => total + this.tokenMatch(token, candidateTokens), 0) / queryTokens.length;
  }

  searchableTokenCount(text: string): number {
    return this.tokens(text).filter((token) => !this.ignoredWords.has(token)).length;
  }

  answerFor(faq: FaqRecord): string {
    if (faq.status !== 'needs_review' && faq.answer.trim()) {
      return faq.answer;
    }

    return 'Энэ асуултын хариулт одоогоор нягтлагдаж байна. Дэлгэрэнгүй мэдээллийг Messenger-ээр лавлана уу.';
  }

  private normalize(text: string): string {
    return text
      .toLocaleLowerCase()
      .replace(/[^a-z0-9а-яёөүҗңһ]+/gi, ' ')
      .trim();
  }

  private tokens(text: string): string[] {
    return this.normalize(text).split(/\s+/).filter((token) => token.length >= 3);
  }

  private tokenMatch(queryToken: string, candidateTokens: string[]): number {
    if (candidateTokens.includes(queryToken)) {
      return 1;
    }

    const queryRoot = queryToken.slice(0, 4);
    if (queryRoot.length < 4) {
      return 0;
    }

    return candidateTokens.some((candidate) => candidate.slice(0, 4) === queryRoot) ? 0.75 : 0;
  }
}
