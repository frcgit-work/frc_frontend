import { Injectable } from '@angular/core';

export interface RelatedContent {
  label: string;
  url: string;
}

export interface FaqChatReply {
  answer: string;
  relatedContent: RelatedContent;
}

interface MockFaq {
  matchTerms: string[];
  answer: string;
  relatedContent: RelatedContent;
}

@Injectable({ providedIn: 'root' })
export class FaqChatService {
  private readonly mockFaqs: MockFaq[] = [
    {
      matchTerms: ['өргөдөл', 'гомдол', 'санал хүсэлт'],
      answer:
        'Туршилтын хариулт: өргөдөл, гомдол гаргах албан зааврыг FAQ-ийн баталгаажсан мэдээллээр энд харуулна.',
      relatedContent: { label: 'Холбоо барих', url: '/contact' },
    },
    {
      matchTerms: ['даатгал', 'нөхөн төлбөр'],
      answer:
        'Туршилтын хариулт: даатгалын тухай баталгаажсан FAQ-г холбоход энэ хэсэгт хариулт болон холбогдох агуулга гарна.',
      relatedContent: { label: 'Түгээмэл асуулт', url: '/faq' },
    },
    {
      matchTerms: ['үнэт цаас', 'хөрөнгийн зах зээл', 'брокер'],
      answer:
        'Туршилтын хариулт: үнэт цаасны зах зээлийн баталгаажсан FAQ-г холбоход энэ хэсэгт хариулт болон холбогдох агуулга гарна.',
      relatedContent: { label: 'Түгээмэл асуулт', url: '/faq' },
    },
  ];

  readonly suggestedQuestions = [
    'Өргөдөл, гомдол хэрхэн гаргах вэ?',
    'Даатгалын талаар мэдээлэл авах',
    'Үнэт цаасны зах зээлийн асуулт',
  ];

  findReply(question: string): FaqChatReply {
    const normalizedQuestion = this.normalize(question);
    const match = this.mockFaqs
      .map((faq) => ({
        faq,
        score: faq.matchTerms.filter((term) =>
          normalizedQuestion.includes(this.normalize(term))
        ).length,
      }))
      .filter((result) => result.score > 0)
      .sort((a, b) => b.score - a.score)[0];

    if (match) {
      return {
        answer: match.faq.answer,
        relatedContent: match.faq.relatedContent,
      };
    }

    return {
      answer:
        'Энэ туршилтын хувилбар цөөн жишээ асуултаар ажиллаж байна. Баталгаажсан FAQ мэдээллийг холбоход таны асуултад тохирох хариултыг санал болгоно.',
      relatedContent: { label: 'Түгээмэл асуулт', url: '/faq' },
    };
  }

  private normalize(value: string): string {
    return value
      .toLocaleLowerCase('mn-MN')
      .replace(/[^0-9a-zа-яёөү\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }
}
