import { useState } from 'react';
import { moods } from '../utils/constants.ts';
import type { Entries, Entry, MoodSlugs } from '../types/types.ts';
import { todayKey } from '../utils/date.ts';

function Form({
  entries,
  targetDate,
  setTargetDate,
  saveEntry,
}: {
  entries: Entries;
  targetDate: string;
  setTargetDate: (date: string) => void;
  saveEntry: (date: string, entry: Entry) => void;
}) {
  const existing = entries[targetDate];
  // Drafts are tracked per date so switching days doesn't leak input across them.
  const [drafts, setDrafts] = useState<Record<string, Partial<Entry>>>({});
  const draft = drafts[targetDate];

  const mood: MoodSlugs | undefined = draft?.mood ?? existing?.mood;
  const note = draft?.note ?? existing?.note ?? '';

  const updateDraft = (patch: Partial<Entry>) =>
    setDrafts((prev) => ({
      ...prev,
      [targetDate]: { ...prev[targetDate], ...patch },
    }));

  const handleSave = () => {
    if (!mood) return;
    saveEntry(targetDate, { mood, note: note.trim() });
    setDrafts((prev) => {
      const { [targetDate]: _, ...rest } = prev;
      return rest;
    });
  };

  const isToday = targetDate === todayKey();

  return (
    <div className='card w-full bg-base-100 border border-base-content/20 rounded-box'>
      <div className='card-body'>
        <h2 className='card-title'>
          {isToday ? 'How are you feeling today?' : `How were you feeling?`}
        </h2>

        {/* Date Picker */}
        <fieldset className='fieldset flex gap-3'>
          <legend className='fieldset-legend'>Date</legend>
          <input
            type='date'
            className='input'
            value={targetDate}
            max={todayKey()}
            onChange={(e) => {
              if (e.target.value) setTargetDate(e.target.value);
            }}
          />
          <button
            className='btn'
            disabled={isToday}
            onClick={() => setTargetDate(todayKey())}
          >
            Today
          </button>
        </fieldset>

        {/* Mood Buttons */}
        <div className='flex flex-wrap gap-2'>
          {moods.map((m) => (
            <button
              key={m.slug}
              type='button'
              className={`btn ${mood === m.slug ? 'btn-active border-2 border-success/20 bg-success/10' : ''}`}
              aria-pressed={mood === m.slug}
              onClick={() => updateDraft({ mood: m.slug })}
            >
              <span
                className='w-3 h-3 rounded-full mr-2'
                style={{ backgroundColor: m.color }}
              />
              {m.title}
            </button>
          ))}
        </div>

        {/* Note */}
        <fieldset className='fieldset'>
          <legend className='fieldset-legend'>Note (optional)</legend>
          <input
            type='text'
            className='input w-full'
            placeholder='Add a short note'
            value={note}
            onChange={(e) => updateDraft({ note: e.target.value })}
          />
        </fieldset>

        <button
          className='btn btn-success'
          disabled={!mood}
          onClick={handleSave}
        >
          {existing ? 'Update Entry' : 'Save Entry'}
        </button>
      </div>
    </div>
  );
}

export default Form;
