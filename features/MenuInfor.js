"use client";
import {
  BroadCastIcon,
  DiscoverIcon,
  PersonIcon,
  RankChartIcon,
} from "@/svg/svg";
import Link from "next/link";
import { usePathname } from "next/navigation";
const MenuInfor = () => {
  const pathname = usePathname();
  return (
    <div className={`mt-3`}>
      <Link
        href='/user'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium  hover:cursor-pointer hover:text-white  ${
          pathname == "/user" ? `bg-black/10 text-white` : ``
        }`}>
        <PersonIcon className='bi bi-person-circle shrink-0' />
        <span className='hidden lg:block'>Cá Nhân</span>
      </Link>

      <Link
        href='/'
        className={` flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer  hover:text-white  ${
          pathname == "/" ? `bg-black/10 text-white ` : ""
        }`}>
        <DiscoverIcon className='bi bi-disc shrink-0' />
        <span className='hidden lg:block'>Khám Phá</span>
      </Link>

      <Link
        href='/rank'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer hover:text-white ${
          pathname == "/rank" ? `bg-black/10 text-white ` : ""
        }`}>
        <RankChartIcon className='bi bi-graph-up shrink-0' />
        <span className='hidden lg:block'>#rank</span>
      </Link>

      <Link
        href='/radio'
        className={`flex items-center justify-center lg:justify-normal gap-2  py-3 px-5 font-medium  hover:cursor-pointer hover:text-white ${
          pathname == "/radio" ? `bg-black/10 text-white 	` : ""
        }`}>
        <BroadCastIcon className='bi bi-broadcast shrink-0' />
        <div className=' items-center gap-2 hidden lg:flex'>
          <span>Radio</span>
          <button className='px-2  bg-red-600 text-[50%] hidden lg:block rounded font-bold text-white'>
            LIVE
          </button>
        </div>
      </Link>
    </div>
  );
};

export default MenuInfor;
