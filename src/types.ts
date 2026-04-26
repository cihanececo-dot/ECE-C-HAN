/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Shop {
  id: string;
  name: string;
  category: string;
  address: string;
  district: string;
  phone: string;
  coordinates: [number, number];
  imageUrl?: string;
  images?: string[];
  description?: string;
}

export interface Comment {
  id: string;
  shopId: string;
  userName: string;
  text: string;
  date: string;
  rating: number;
}

export type Language = 'TR' | 'EN';
export type Theme = 'light' | 'dark';

export interface AppState {
  language: Language;
  theme: Theme;
  favorites: string[];
  comments: Comment[];
  setLanguage: (lang: Language) => void;
  toggleTheme: () => void;
  toggleFavorite: (id: string) => void;
  addComment: (comment: Comment) => void;
}
