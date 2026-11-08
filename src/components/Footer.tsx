import GithubLogo from '../assets/GitHub_Invertocat_Black.svg';

const GITHUB_URL = 'https://github.com/TheWilley/mood-tracker';

function Footer() {
  return (
    <footer className='footer footer-horizontal footer-center flex flex-col items-center gap-3 rounded-box bg-primary text-primary-content p-10 text-center'>
      <aside className='flex flex-col items-center gap-3'>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width={48}
          height={48}
          fill='currentColor'
          aria-hidden='true'
        >
          <path d='M14 15C14 16.11 13.11 17 12 17C10.89 17 10 16.1 10 15C10 13.89 10.89 13 12 13C13.11 13 14 13.9 14 15M13.09 20C13.21 20.72 13.46 21.39 13.81 22H6C4.89 22 4 21.1 4 20V10C4 8.89 4.89 8 6 8H7V6C7 3.24 9.24 1 12 1S17 3.24 17 6V8H18C19.11 8 20 8.9 20 10V13.09C19.67 13.04 19.34 13 19 13C18.66 13 18.33 13.04 18 13.09V10H6V20H13.09M9 8H15V6C15 4.34 13.66 3 12 3S9 4.34 9 6V8M21.34 15.84L17.75 19.43L16.16 17.84L15 19L17.75 22L22.5 17.25L21.34 15.84Z' />
        </svg>
        <p className='font-bold leading-relaxed'>
          Everything runs locally on your computer.
          <br />
          No account required.
        </p>
      </aside>

      <hr className='my-3 mb-0 w-24 mx-auto text-primary-content/30' />

      <nav className='flex flex-col items-center gap-2'>
        <a
          href={GITHUB_URL}
          target='_blank'
          rel='noopener noreferrer'
          aria-label='View the source code on GitHub'
          title='View source on GitHub'
          className='flex size-14 items-center justify-center rounded-full bg-white shadow-md transition-transform hover:scale-110 focus-visible:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-content'
        >
          <img src={GithubLogo} alt='' className='size-8' />
        </a>
        <span className='text-sm opacity-80'>Open source on GitHub</span>
      </nav>
    </footer>
  );
}

export default Footer;
