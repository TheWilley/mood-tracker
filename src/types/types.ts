export type MoodSlugs = 'very-good' | 'good' | 'okay' | 'bad' | 'very-bad';
export type MoodTitles = 'Very Good' | 'Good' | 'Okay' | 'Bad' | 'Very Bad';

export interface Mood {
  slug: MoodSlugs;
  color: string;
  title: MoodTitles;
}

export interface Entry {
  mood: MoodSlugs;
  note: string;
}

// Keyed by local-time YYYY-MM-DD
export type Entries = Record<string, Entry>;
