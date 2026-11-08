import { type ChangeEvent, useRef } from 'react';
import { localStorageKey } from '../utils/constants.ts';
import type { Entries } from '../types/types.ts';
import { exportCsv, exportJson, importFile } from '../utils/exportImport.ts';

interface ExportProps {
  entries: Entries;
  importEntries: (imported: Entries) => void;
}

function Export({ entries, importEntries }: ExportProps) {
  const importInputRef = useRef<HTMLInputElement>(null);

  const handleImport = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    try {
      const imported = await importFile(file);
      const count = Object.keys(imported).length;
      if (
        confirm(
          `Import ${count} entries? Entries on the same dates will be overwritten.`,
        )
      ) {
        importEntries(imported);
      }
    } catch (err) {
      alert(`Import failed: ${err instanceof Error ? err.message : err}`);
    }
  };

  /**
   * Clears all data in localstorage and reloads app.
   */
  const clearData = () => {
    if (confirm('Are you sure? (this will delete all stored entries)')) {
      localStorage.removeItem(localStorageKey);
      location.reload();
    }
  };

  return (
    <div className='card w-full bg-base-100 border border-base-content/20 rounded-box'>
      <div className='card-body'>
        <h2 className='card-title'>Take your data with you</h2>
        <div className='flex gap-3 mt-2'>
          <button className='btn w-fit' onClick={() => exportJson(entries)}>
            Export JSON
          </button>
          <button className='btn w-fit' onClick={() => exportCsv(entries)}>
            Export CSV
          </button>
          <button
            className='btn w-fit'
            onClick={() => importInputRef.current?.click()}
          >
            Import JSON/CSV
          </button>
          <input
            ref={importInputRef}
            type='file'
            accept='.json,.csv,application/json,text/csv'
            className='hidden'
            onChange={handleImport}
          />
        </div>
        <p className='text-base-content/70 mt-5'>
          Saved in this browser on this site. Clearing site data can delete
          entries. Other browsers or devices will not show them. No cloud backup
          or sync.
        </p>
        <hr className='mt-5 mb-5 text-base-content/10' />
        <button className='btn w-fit btn-warning' onClick={clearData}>
          Clear all data
        </button>
        <p className='text-base-content/70 mt-5'>
          Permanently deletes this tool's entries in this browser. Cannot be
          undone.
        </p>
      </div>
    </div>
  );
}

export default Export;
