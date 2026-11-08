import { csv2json, json2csv } from 'json-2-csv';
import { moods } from './constants.ts';
import type { Entries, MoodSlugs } from '../types/types.ts';

const dateKeyPattern = /^\d{4}-\d{2}-\d{2}$/;
const moodSlugs = new Set<string>(moods.map((m) => m.slug));

/**
 * Triggers a browser download of the given text content.
 */
const download = (content: string, filename: string, mimeType: string) => {
  const url = URL.createObjectURL(new Blob([content], { type: mimeType }));
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

export const exportJson = (entries: Entries) =>
  download(
    JSON.stringify(entries, null, 2),
    'mood-tracker-export.json',
    'application/json',
  );

export const exportCsv = (entries: Entries) => {
  const rows = Object.entries(entries)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, { mood, note }]) => ({ date, mood, note }));
  download(
    json2csv(rows, { keys: ['date', 'mood', 'note'], excelBOM: true }),
    'mood-tracker-export.csv',
    'text/csv',
  );
};

/**
 * Validates `[date, mood, note]` triples and builds an Entries object.
 * Throws if anything is malformed, so a bad file never partially imports.
 */
const buildEntries = (rows: [unknown, unknown, unknown][]): Entries => {
  const entries: Entries = {};
  for (const [date, mood, note] of rows) {
    if (typeof date !== 'string' || !dateKeyPattern.test(date)) {
      throw new Error(`Invalid date: ${String(date)}`);
    }
    if (typeof mood !== 'string' || !moodSlugs.has(mood)) {
      throw new Error(`Invalid mood on ${date}: ${String(mood)}`);
    }
    entries[date] = {
      mood: mood as MoodSlugs,
      note: typeof note === 'string' ? note : '',
    };
  }
  return entries;
};

const parseJson = (text: string): Entries => {
  const data: unknown = JSON.parse(text);
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error('Expected a JSON object keyed by date');
  }
  return buildEntries(
    Object.entries(data).map(([date, entry]) => [
      date,
      (entry as { mood?: unknown } | null)?.mood,
      (entry as { note?: unknown } | null)?.note,
    ]),
  );
};

const parseCsv = (text: string): Entries => {
  // Keep every value as a string so notes like "123" aren't turned into numbers
  const rows = csv2json(text, {
    excelBOM: true,
    parseValue: (value: string) => value,
  }) as Record<string, unknown>[];
  return buildEntries(rows.map((r) => [r.date, r.mood, r.note]));
};

/**
 * Reads an exported .json or .csv file and returns the validated entries.
 */
export const importFile = async (file: File): Promise<Entries> => {
  const text = await file.text();
  return file.name.toLowerCase().endsWith('.csv')
    ? parseCsv(text)
    : parseJson(text);
};
