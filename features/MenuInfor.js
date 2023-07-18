"use client";
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
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-person-circle shrink-0'
          viewBox='0 0 16 16'>
          <path d='M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
          <path
            fillRule='evenodd'
            d='M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z'
          />
        </svg>
        <span className='hidden lg:block'>Cá Nhân</span>
      </Link>

      <Link
        href='/'
        className={` flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer  hover:text-white  ${
          pathname == "/" ? `bg-black/10 text-white ` : ""
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-disc shrink-0'
          viewBox='0 0 16 16'>
          <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
          <path d='M10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM8 4a4 4 0 0 0-4 4 .5.5 0 0 1-1 0 5 5 0 0 1 5-5 .5.5 0 0 1 0 1zm4.5 3.5a.5.5 0 0 1 .5.5 5 5 0 0 1-5 5 .5.5 0 0 1 0-1 4 4 0 0 0 4-4 .5.5 0 0 1 .5-.5z' />
        </svg>
        <span className='hidden lg:block'>Khám Phá</span>
      </Link>

      <Link
        href='/rank'
        className={`flex items-center justify-center lg:justify-normal gap-2 py-3 px-5 font-medium hover:cursor-pointer hover:text-white ${
          pathname == "/rank" ? `bg-black/10 text-white ` : ""
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-graph-up shrink-0'
          viewBox='0 0 16 16'>
          <path
            fillRule='evenodd'
            d='M0 0h1v15h15v1H0V0Zm14.817 3.113a.5.5 0 0 1 .07.704l-4.5 5.5a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61 4.15-5.073a.5.5 0 0 1 .704-.07Z'
          />
        </svg>
        <span className='hidden lg:block'>#rank</span>
      </Link>

      <Link
        href='/radio'
        className={`flex items-center justify-center lg:justify-normal gap-2  py-3 px-5 font-medium  hover:cursor-pointer hover:text-white ${
          pathname == "/radio" ? `bg-black/10 text-white 	` : ""
        }`}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width='20'
          height='20'
          fill='currentColor'
          className='bi bi-broadcast shrink-0'
          viewBox='0 0 16 16'>
          <path d='M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z' />
        </svg>
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
