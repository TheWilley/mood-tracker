import { moods } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';

function MoodDistribution({ entries }: { entries: Entries }) {
  const counts = Object.values(entries).reduce<Record<string, number>>(
    (acc, e) => ((acc[e.mood] = (acc[e.mood] ?? 0) + 1), acc),
    {},
  );
  const total = Object.values(counts).reduce((a, b) => a + b, 0);

  return (
    <div className='card w-full bg-base-100 border border-base-content/20 rounded-box'>
      <div className='card-body'>
        <h2 className='card-title'>Mood distribution</h2>
        {total === 0 ? (
          <p className='text-base-content/70'>No entries yet.</p>
        ) : (
          moods.map((m) => {
            const count = counts[m.slug] ?? 0;
            const percent = Math.round((count / total) * 100);
            return (
              <div key={m.slug} className='flex items-center gap-2'>
                <span className='w-20 text-sm shrink-0'>{m.title}</span>
                <progress
                  className='progress grow'
                  style={{ color: m.color }}
                  value={count}
                  max={total}
                  aria-label={`${m.title}: ${percent}%`}
                ></progress>
                <span className='w-20 text-xs text-right shrink-0'>
                  {percent}% · ({count})
                </span>
              </div>
            );
          })
        )}
        <span className='text-base-content/70'>
          {total} {total === 1 ? 'day' : 'days'} recorded
        </span>
      </div>
    </div>
  );
}

export default MoodDistribution;
