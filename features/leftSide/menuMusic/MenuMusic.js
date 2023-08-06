"use client";
import { CategoryIcon, MusicIcon, MVIcon, StarIcon } from "@/svg/svg";
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
        <MusicIcon className='bi bi-music-note-beamed shrink-0' />
        <span className='hidden lg:block'>Nhạc Mới</span>
      </Link>

      {/* <Link
        href='#'
        className={` flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer  hover:text-white  ${
          pathname == "#" ? `bg-black/10 text-white ` : ""
        }`}>
        <CategoryIcon className='bi bi-grid shrink-0' />
        <span className='hidden lg:block'>Thể loại</span>
      </Link> */}

      <Link
        href='/trending'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer hover:text-white ${
          pathname == "#" ? `bg-black/10 text-white ` : ""
        }`}>
        <StarIcon className='bi bi-star shrink-0' />
        <span className='hidden lg:block'>Top 100</span>
      </Link>

      <Link
        href='/mvhot'
        className={`flex items-center justify-center lg:justify-normal gap-2  py-3 px-5 font-medium  hover:cursor-pointer hover:text-white ${
          pathname == "#" ? `bg-black/10 text-white 	` : ""
        }`}>
        <MVIcon className='shrink-0 w-6 h-6' />
        <span className='hidden lg:block'>MV</span>
      </Link>
    </div>
  );
};

export default MenuMusic;
