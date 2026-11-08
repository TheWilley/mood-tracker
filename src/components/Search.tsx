import { moods } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';
import { useState } from 'react';

const MAX_RESULTS = 10;

function Search({ entries }: { entries: Entries }) {
  const [query, setQuery] = useState('');

  // Regex is good for splitting words
  // https://regex101.com/?regex=%5Cs%2B&testString=these+are+some+words&flags=gm&flavor=javascript&delimiter=%2F
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);

  const results = words.length
    ? Object.entries(entries)
        .filter(([date, entry]) => {
          const moodTitle =
            moods.find((m) => m.slug === entry.mood)?.title ?? '';

          // https://en.wikipedia.org/wiki/Two-way_string-matching_algorithm
          // Yes it's not the algorithm used here but the variable name seemed suitable
          const haystack =
            `${date} ${entry.mood} ${moodTitle} ${entry.note}`.toLowerCase();

          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every
          // Essentially, does every word in our query exist in a haystack for this given entry?
          return words.every((w) => haystack.includes(w));
        })
        .slice(0, MAX_RESULTS)
    : [];

  return (
    <div className='card w-full bg-base-100 border border-base-content/20 rounded-box'>
      <div className='card-body'>
        <h2 className='card-title'>Search entries</h2>
        <input
          className='input input-bordered w-full'
          placeholder='Search by note, mood, or date'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className='ml-2'>
          {query.length === 0 ? (
            <p className='text-base-content/70'>Please enter a query.</p>
          ) : results?.length === 0 ? (
            <p className='text-base-content/70'>No entries found.</p>
          ) : (
            <>
              <p className='text-base-content/70'>
                Showing {results.length} results.
              </p>
              <ul className='mt-2'>
                {results?.map(([date, entry]) => {
                  const mood = moods.find((m) => m.slug === entry.mood);
                  return (
                    <li className='flex items-center' key={date}>
                      <span
                        className='w-3 h-3 rounded-full mr-2'
                        style={{ backgroundColor: mood?.color }}
                      />
                      <div>
                        {date} — {mood?.title}
                        {entry.note && ` · ${entry.note}`}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
