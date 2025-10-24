// Hexagram and I Ching types
export interface Hexagram {
  id: string;
  number: number;
  name: string;
  chineseName: string;
  upperTrigram: string;
  lowerTrigram: string;
  judgement: string;
  image: string;
  lines: HexagramLine[];
  interpretation: string;
  keywords: string[];
  element: string;
  season: string;
}

export interface HexagramLine {
  lineNumber: number;
  text: string;
  meaning: string;
  changing: boolean;
}

export interface MultiLanguageText {
  en: string;
  zh: string;
  hi: string;
  es: string;
  fr: string;
  ja: string;
  [key: string]: string;
}

export interface HexagramTranslation {
  id: string;
  number: number;
  name: MultiLanguageText;
  chineseName: string;
  upperTrigram: string;
  lowerTrigram: string;
  judgement: MultiLanguageText;
  image: MultiLanguageText;
  lines: HexagramLineTranslation[];
  interpretation: MultiLanguageText;
  keywords: MultiLanguageText;
  element: string;
  season: string;
}

export interface HexagramLineTranslation {
  lineNumber: number;
  text: MultiLanguageText;
  meaning: MultiLanguageText;
  changing: boolean;
}

// User and reading types
export interface User {
  id: string;
  email: string;
  name?: string;
  avatar_url?: string;
  created_at: string;
}

export interface UserReading {
  id: string;
  user_id: string;
  hexagram_id: string;
  question?: string;
  context?: string;
  timestamp: string;
  hexagram?: HexagramTranslation;
}

export interface UserJournal {
  id: string;
  user_id: string;
  reading_id?: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
  reading?: UserReading;
}

// Language and localization types
export type SupportedLanguage = 'en' | 'zh' | 'hi' | 'es' | 'fr' | 'ja';

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  flag: string;
}

// Audio and voice types
export interface AudioConfig {
  language: SupportedLanguage;
  voiceId: string;
  modelId: string;
}

// UI and component types
export interface HexagramCardProps {
  hexagram: HexagramTranslation;
  language: SupportedLanguage;
  onClick?: () => void;
  className?: string;
}

export interface AudioPlayerProps {
  text: string;
  language: SupportedLanguage;
  className?: string;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  count: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface JournalFormData {
  title: string;
  content: string;
  reading_id?: string;
}

export interface ReadingFormData {
  question?: string;
  context?: string;
}
