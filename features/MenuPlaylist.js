"use client";
import DropPlaylist from "@/components/DropPlaylist";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuPlaylist = () => {
  const pathname = usePathname();

  return (
    <div className=''>
      <h1 className=' lg:text-2xl px-5 font-semibold sm:text-xs hidden sm:block 	'>
        THƯ VIỆN
      </h1>
      {/* Playlist */}
      <div className='collapse collapse-plus  '>
        <input type='checkbox' />
        <div className='group flex justify-between items-center py-3 px-5 collapse-title'>
          <Link
            href='/playlist'
            className={`flex items-center justify-center md:justify-normal gap-2  font-medium  hover:cursor-pointer hover:text-white  ${
              pathname == "#" ? `bg-black/10 text-white` : ``
            }`}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-music-note-list shrink-0'
              viewBox='0 0 16 16'>
              <path d='M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z' />
              <path fillRule='evenodd' d='M12 3v10h-1V3h1z' />
              <path d='M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z' />
              <path
                fillRule='evenodd'
                d='M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z'
              />
            </svg>
            <span className='hidden md:block'>Playlist</span>
          </Link>
        </div>
        <div className='  collapse-content overflow-x-auto'>
          <DropPlaylist />
        </div>
      </div>
      {/* Recently */}
      <Link
        href='/#'
        className={`flex items-center justify-center md:justify-normal gap-2 py-3 px-5 font-medium  hover:cursor-pointer hover:text-white  ${
          pathname == "#" ? `bg-black/10 text-white` : ``
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-arrow-counterclockwise shrink-0'
          viewBox='0 0 16 16'>
          <path
            fillRule='evenodd'
            d='M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z'
          />
          <path d='M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z' />
        </svg>
        <span className='hidden md:block'>Gần đây</span>
      </Link>
    </div>
  );
};

export default MenuPlaylist;
