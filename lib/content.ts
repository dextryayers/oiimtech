import { hpServices, testimonials, defaultFaq, defaultHero, defaultAnnouncement, defaultContacts } from '@/lib/services-data';

export type ContentKey =
  | 'services'
  | 'testimonials'
  | 'faq'
  | 'hero'
  | 'announcement'
  | 'contacts';

export const CONTENT_KEYS: ContentKey[] = [
  'services',
  'testimonials',
  'faq',
  'hero',
  'announcement',
  'contacts',
];

export function getDefaultContent(key: ContentKey): unknown {
  switch (key) {
    case 'services':
      return hpServices;
    case 'testimonials':
      return testimonials;
    case 'faq':
      return defaultFaq;
    case 'hero':
      return defaultHero;
    case 'announcement':
      return defaultAnnouncement;
    case 'contacts':
      return defaultContacts;
  }
}
