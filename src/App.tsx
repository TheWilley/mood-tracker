import './App.css';
import 'cally';
import Header from './components/Header.tsx';
import Form from './components/Form.tsx';
import Calendar from './components/Calendar.tsx';
import Recents from './components/Recents.tsx';
import Distribution from './components/Distribution.tsx';
import Export from './components/Export.tsx';
import Footer from './components/Footer.tsx';
import { useEffect, useState } from 'react';
import type { Entries, Entry } from './types/types.ts';
import { todayKey } from './utils/date.ts';
import { localStorageKey } from './utils/constants.ts';
import Search from './components/Search.tsx';

function App() {
  // https://www.geeksforgeeks.org/reactjs/how-to-persist-state-with-local-or-session-storage-in-react/
  // We don't need a custom hook for this, it's very simple
  const [entries, setEntries] = useState<Entries>(() => {
    const storedEntries = localStorage.getItem(localStorageKey);
    return storedEntries ? JSON.parse(storedEntries) : {};
  });
  const [targetDate, setTargetDate] = useState(todayKey);

  const saveEntry = (date: string, entry: Entry) => {
    setEntries((prev) => ({ ...prev, [date]: entry }));
  };

  const importEntries = (imported: Entries) => {
    setEntries((prev) => ({ ...prev, ...imported }));
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(entries));
  }, [entries]);

  return (
    <>
      <section className='flex flex-col grow place-content-center place-items-center px-5 pt-8 pb-6 bg-base-300'>
        <div className='*:mb-5 w-full max-w-250'>
          <Header />
          <div className='grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4'>
            <Form
              entries={entries}
              targetDate={targetDate}
              setTargetDate={setTargetDate}
              saveEntry={saveEntry}
            />
            <Calendar
              entries={entries}
              targetDate={targetDate}
              setTargetDate={setTargetDate}
            />
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Search entries={entries} />
            <Recents entries={entries} />
            <Distribution entries={entries} />
          </div>
          <Export entries={entries} importEntries={importEntries} />
          <Footer />
        </div>
      </section>
    </>
  );
}

export default App;
