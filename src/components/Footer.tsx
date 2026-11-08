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
          className='flex size-14 items-center justify-center hover:scale-110 transition-transform'
        >
          <svg
            width='98'
            height='96'
            viewBox='0 0 98 96'
            fill='currentColor'
            xmlns='http://www.w3.org/2000/svg'
          >
            <g clip-path='url(#clip0_730_27126)'>
              <path d='M41.4395 69.3848C28.8066 67.8535 19.9062 58.7617 19.9062 46.9902C19.9062 42.2051 21.6289 37.0371 24.5 33.5918C23.2559 30.4336 23.4473 23.7344 24.8828 20.959C28.7109 20.4805 33.8789 22.4902 36.9414 25.2656C40.5781 24.1172 44.4062 23.543 49.0957 23.543C53.7852 23.543 57.6133 24.1172 61.0586 25.1699C64.0254 22.4902 69.2891 20.4805 73.1172 20.959C74.457 23.543 74.6484 30.2422 73.4043 33.4961C76.4668 37.1328 78.0937 42.0137 78.0937 46.9902C78.0937 58.7617 69.1934 67.6621 56.3691 69.2891C59.623 71.3945 61.8242 75.9883 61.8242 81.252L61.8242 91.2051C61.8242 94.0762 64.2168 95.7031 67.0879 94.5547C84.4102 87.9512 98 70.6289 98 49.1914C98 22.1074 75.9883 6.69539e-07 48.9043 4.309e-07C21.8203 1.92261e-07 -1.9479e-07 22.1074 -4.3343e-07 49.1914C-6.20631e-07 70.4375 13.4941 88.0469 31.6777 94.6504C34.2617 95.6074 36.75 93.8848 36.75 91.3008L36.75 83.6445C35.4102 84.2188 33.6875 84.6016 32.1562 84.6016C25.8398 84.6016 22.1074 81.1563 19.4277 74.7441C18.375 72.1602 17.2266 70.6289 15.0254 70.3418C13.877 70.2461 13.4941 69.7676 13.4941 69.1934C13.4941 68.0449 15.4082 67.1836 17.3223 67.1836C20.0977 67.1836 22.4902 68.9063 24.9785 72.4473C26.8926 75.2227 28.9023 76.4668 31.2949 76.4668C33.6875 76.4668 35.2187 75.6055 37.4199 73.4043C39.0469 71.7773 40.291 70.3418 41.4395 69.3848Z' />
            </g>
            <defs>
              <clipPath id='clip0_730_27126'>
                <rect width='98' height='96' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </a>
        <span className='text-sm'>Open source on GitHub</span>
      </nav>
    </footer>
  );
}

export default Footer;
