import { moods } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';
import { toKey } from '../utils/date.ts';

// Calendar cell styles derived from the same mood colors the buttons use.
// Parts live in the calendar's shadow DOM, so they must be styled from a
// document-level stylesheet.
const moodPartStyles = moods
  .map(
    (mood) => `calendar-month::part(mood-${mood.slug}) {
  background: ${mood.color};
  color: black;
  border-radius: 0.5rem;
}`,
  )
  .join('\n');

function Calendar({
  entries,
  targetDate,
  setTargetDate,
}: {
  entries: Entries;
  targetDate: string;
  setTargetDate: (date: string) => void;
}) {
  const getDayParts = (date: Date) => {
    const entry = entries[toKey(date)];
    return entry ? `mood-${entry.mood}` : '';
  };

  return (
    <>
      <style>{moodPartStyles}</style>
      <calendar-date
        onchange={(e) => {
          const value = (e.target as HTMLInputElement).value;
          if (value) setTargetDate(value);
        }}
        value={targetDate}
        focusedDate={targetDate}
        getDayParts={getDayParts}
        className='cally w-full bg-base-100 border border-base-content/20 rounded-box'
      >
        <svg
          aria-label='Previous'
          className='fill-current size-4'
          slot='previous'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path fill='currentColor' d='M15.75 19.5 8.25 12l7.5-7.5'></path>
        </svg>
        <svg
          aria-label='Next'
          className='fill-current size-4'
          slot='next'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
        >
          <path fill='currentColor' d='m8.25 4.5 7.5 7.5-7.5 7.5'></path>
        </svg>
        <calendar-month></calendar-month>
      </calendar-date>
    </>
  );
}

export default Calendar;
