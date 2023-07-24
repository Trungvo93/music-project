"use client";
import Image from "next/image";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context/context";
import { Avatar } from "@mui/material";
const UserProfileComp = () => {
  const { state } = useContext(AppContext);
  const [createDate, setCreateDate] = useState();
  const [heightRightBanner, setHeightRightBanner] = useState();
  useEffect(() => {
    const time = new Date(state.userLogged.createdAt);
    const date = time.getDate();
    const month = time.getMonth() + 1;
    const year = time.getFullYear();
    setCreateDate({ date: date, month: month, year: year });
  }, []);

  // Get the Window’s Width on Resize
  const [windowWidth, setWindowWidth] = useState();
  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  });
  useEffect(() => {
    let height = document.getElementById("rightBannerUserProfile").offsetHeight;
    setHeightRightBanner(height);
  }, [windowWidth]);
  return (
    <div>
      {/* Header profile */}
      <div className='bg-slate-500 p-5 text-white m-3 rounded flex lg:flex-row flex-col justify-center sm:min-w-0 min-w-[500px]'>
        <div className='m-3 flex lg:flex-row flex-col gap-4 lg:items-center w-full h-full'>
          <Image
            src={state.userLogged.image}
            alt={state.userLogged.user_name}
            width={110}
            height={110}
            className='rounded-full cursor-pointer 	h-28 w-28 object-cover outline outline-offset-4 outline-white'
          />
          <div>
            <p className='uppercase font-medium text-xl '>
              {state.userLogged.user_name}
            </p>
            <p>ID: {state.userLogged._id}</p>
            <p>Email: {state.userLogged.email}</p>
            <p>
              Ngày tạo:{" "}
              {createDate
                ? `${createDate.date}/${createDate.month}/${createDate.year}`
                : ""}
            </p>
          </div>
        </div>
        <div
          className='w-full lg:h-auto h-56  relative p-2'
          id='rightBannerUserProfile'>
          <Image
            src='/assets/profile/Mrtui_Background3.png'
            alt='Mrtui_Background3.png'
            width={800}
            height={800}
            className='absolute w-auto h-1/2 object-cover top-1/2 md:left-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full shadow-md'
          />
          <Image
            src='/assets/profile/Mrtui_Background1.png'
            alt='Mrtui_Background1.png'
            width={800}
            height={800}
            className='absolute w-auto h-1/2 object-cover top-[12%]  right-[20%] rounded-full shadow-md hidden md:block'
          />

          <div
            className={`group/USUK cursor-pointer absolute object-cover top-[50%] left-[22%]  rounded-full bg-blue-500 flex justify-center items-center text-[70%] whitespace-nowrap shadow-md `}
            style={
              heightRightBanner
                ? {
                    width: heightRightBanner / 2 + "px",
                    height: heightRightBanner / 2 + "px",
                  }
                : {}
            }>
            <Link
              href={"/"}
              className='group-hover/USUK:flex hidden w-full h-full items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 absolute'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            </Link>
            <p className='group-hover/USUK:hidden block'>BXH USUK</p>
          </div>
          <div
            className={`group/Kpop cursor-pointer absolute object-cover top-[20%] md:left-0 -left-2   rounded-full bg-orange-400 flex justify-center items-center text-[70%] whitespace-nowrap shadow-md`}
            style={
              heightRightBanner
                ? {
                    width: heightRightBanner / 2 + "px",
                    height: heightRightBanner / 2 + "px",
                  }
                : {}
            }>
            <Link
              href={"/"}
              className='group-hover/Kpop:flex hidden w-full h-full items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 absolute'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            </Link>
            <p className='group-hover/Kpop:hidden block'>BXH HÀN</p>
          </div>
          <div
            className={`group/VN cursor-pointer absolute object-cover top-[20%] lg:right-0 -right-1  rounded-full bg-green-500 flex justify-center items-center text-[70%] whitespace-nowrap shadow-md`}
            style={
              heightRightBanner
                ? {
                    width: heightRightBanner / 2 + "px",
                    height: heightRightBanner / 2 + "px",
                  }
                : {}
            }>
            <Link
              href={"/"}
              className='group-hover/VN:flex hidden w-full h-full items-center justify-center'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 absolute'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            </Link>
            <p className='group-hover/VN:hidden block'>BXH VN</p>
          </div>
        </div>
      </div>

      {/* User playlist */}
      <div className='m-3'>
        <div className='mb-2'>
          <p className='text-blue-500 text-xl font-medium'>PLAYLIST | ALBUM</p>
        </div>
      </div>
    </div>
  );
};

export default UserProfileComp;
