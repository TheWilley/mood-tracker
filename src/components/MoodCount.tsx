import { moods } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';

function MoodCount({ entries }: { entries: Entries }) {
  const all = Object.values(entries);
  const count = (slug: string) => all.filter((e) => e.mood === slug).length;

  return (
    <div className='card w-full bg-base-100 border border-base-content/20 rounded-box'>
      <div className='card-body'>
        <h2 className='card-title'>Mood count</h2>
        <ul>
          {moods.map((mood) => (
            <li className='flex justify-between mb-2' key={mood.slug}>
              <span>{mood.title}</span>
              <div>{count(mood.slug)}</div>
            </li>
          ))}
        </ul>

        <span className='text-base-content/70'>
          {all.length} {all.length === 1 ? 'day' : 'days'} recorded
        </span>
      </div>
    </div>
  );
}

export default MoodCount;
