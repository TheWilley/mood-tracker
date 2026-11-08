import { moods } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';

const RECENT_COUNT = 5;

function Recents({ entries }: { entries: Entries }) {
  const recent = Object.entries(entries)
    .sort(([a], [b]) => b.localeCompare(a))
    .slice(0, RECENT_COUNT);

  return (
    <div className='card w-full bg-base-100 border border-base-content/20 rounded-box'>
      <div className='card-body'>
        <h2 className='card-title'>Recent entries</h2>
        {recent.length === 0 ? (
          <p className='text-base-content/70'>No entries yet.</p>
        ) : (
          <ul>
            {recent.map(([date, entry]) => {
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
        )}
      </div>
    </div>
  );
}

export default Recents;
