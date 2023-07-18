"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuMusic = () => {
  const pathname = usePathname();

  return (
    <div className={`mt-3`}>
      <Link
        href='/newmusic'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium  hover:cursor-pointer hover:text-white  ${
          pathname == "/newmusic" ? `bg-black/10 text-white` : ``
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-music-note-beamed shrink-0'
          viewBox='0 0 16 16'>
          <path d='M6 13c0 1.105-1.12 2-2.5 2S1 14.105 1 13c0-1.104 1.12-2 2.5-2s2.5.896 2.5 2zm9-2c0 1.105-1.12 2-2.5 2s-2.5-.895-2.5-2 1.12-2 2.5-2 2.5.895 2.5 2z' />
          <path fillRule='evenodd' d='M14 11V2h1v9h-1zM6 3v10H5V3h1z' />
          <path d='M5 2.905a1 1 0 0 1 .9-.995l8-.8a1 1 0 0 1 1.1.995V3L5 4V2.905z' />
        </svg>
        <span className='hidden lg:block'>Nhạc Mới</span>
      </Link>

      <Link
        href='#'
        className={` flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer  hover:text-white  ${
          pathname == "#" ? `bg-black/10 text-white ` : ""
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-grid shrink-0'
          viewBox='0 0 16 16'>
          <path d='M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5h-3z' />
        </svg>
        <span className='hidden lg:block'>Thể loại</span>
      </Link>

      <Link
        href='#'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer hover:text-white ${
          pathname == "#" ? `bg-black/10 text-white ` : ""
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-star shrink-0'
          viewBox='0 0 16 16'>
          <path d='M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z' />
        </svg>
        <span className='hidden lg:block'>Top 100</span>
      </Link>

      <Link
        href='#'
        className={`flex items-center justify-center lg:justify-normal gap-2  py-3 px-5 font-medium  hover:cursor-pointer hover:text-white ${
          pathname == "#" ? `bg-black/10 text-white 	` : ""
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-camera-video shrink-0'
          viewBox='0 0 16 16'>
          <path
            fillRule='evenodd'
            d='M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z'
          />
        </svg>
        <span className='hidden lg:block'>MV</span>
      </Link>
    </div>
  );
};

export default MenuMusic;
