import { moods } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';
import { useState } from 'react';

const MAX_RESULTS = 10;

function Search({ entries }: { entries: Entries }) {
  const [query, setQuery] = useState('');
  const q = query.trim().toLowerCase();

  const results = q
    ? Object.entries(entries)
        .filter(
          ([date, entry]) =>
            entry.note?.toLowerCase().includes(q) ||
            entry.mood.toLowerCase().includes(q) ||
            date.includes(q),
        )
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
