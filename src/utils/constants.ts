import type { Mood } from '../types/types.ts';

export const localStorageKey = '__mood_tracker_data__';

export const moods: Mood[] = [
  {
    slug: 'very-good',
    color: '#e0b85c',
    title: 'Very Good',
  },
  {
    slug: 'good',
    color: '#a3b88a',
    title: 'Good',
  },
  {
    slug: 'okay',
    color: '#c4bcad',
    title: 'Okay',
  },
  {
    slug: 'bad',
    color: '#b79ccb',
    title: 'Bad',
  },
  {
    slug: 'very-bad',
    color: '#9aa2da',
    title: 'Very Bad',
  },
];
