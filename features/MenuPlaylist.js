"use client";
import DropPlaylist from "@/components/DropPlaylist";
import { ArrowCircleIcon, ListMusicIcon } from "@/svg/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MenuPlaylist = () => {
  const pathname = usePathname();

  return (
    <div className=''>
      <h1 className=' lg:text-2xl px-5 font-semibold sm:text-xs hidden lg:block 	'>
        THƯ VIỆN
      </h1>
      {/* Playlist */}
      <div className='hidden lg:collapse collapse-plus  '>
        <input type='checkbox' className='' />
        <div className='group flex justify-center lg:justify-between items-center py-3 px-5 collapse-title'>
          <div
            className={`flex items-center justify-center lg:justify-normal gap-2  font-medium  hover:cursor-pointer hover:text-white  ${
              pathname == "#" ? `bg-black/10 text-white` : ``
            }`}>
            <ListMusicIcon className='bi bi-music-note-list shrink-0' />
            <span className=''>Playlist</span>
          </div>
        </div>
        <div className='  collapse-content hidden lg:block'>
          <DropPlaylist />
        </div>
      </div>
      <div className='lg:hidden flex justify-center  '>
        <Link
          href='/playlist'
          className={`flex items-center justify-center lg:justify-normal w-full py-3 px-5  font-medium  hover:cursor-pointer hover:text-white  ${
            pathname == "/playlist" ? `bg-black/10 text-white` : ``
          }`}>
          <ListMusicIcon className='bi bi-music-note-list shrink-0' />
        </Link>
      </div>
      {/* Recently */}
      <Link
        href='/#'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium  hover:cursor-pointer hover:text-white  ${
          pathname == "#" ? `bg-black/10 text-white` : ``
        }`}>
        <ArrowCircleIcon className='bi bi-arrow-counterclockwise shrink-0' />
        <span className='hidden lg:block'>Gần đây</span>
      </Link>
    </div>
  );
};

export default MenuPlaylist;
