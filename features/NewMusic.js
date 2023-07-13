"use client";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import useSWR from "swr";
import { AppContext } from "../context/context";
import { urlNewMusic } from "../api/allApi";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const NewMusic = () => {
  const { state, dispatch } = useContext(AppContext);
  const { data: dataNewMusic, error: errorNewMusic } = useSWR(
    urlNewMusic,
    fetcher
  );
  const [listNewMusic, setListNewMusic] = useState();
  useEffect(() => {
    if (dataNewMusic) {
      const list = dataNewMusic.slice(0, 12);
      setListNewMusic(list);
    }
  }, [dataNewMusic]);

  const msToTime = (timeUpdated) => {
    const ms = Date.now() - timeUpdated;
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    if (seconds < 60) return seconds + " Giây trước";
    else if (minutes < 60) return minutes + " Phút trước";
    else if (hours < 24) return hours + " Giờ trước";
    else if (days < 7) return days + " Ngày trước";
    else if (days < 14) return "1 tuần trước";
    else if (days < 21) return "2 tuần trước";
    else if (days < 27) return "3 tuần trước";
    else if (days < 60) return "1 tháng trước";
    else if (days < 90) return "2 tháng trước";
    else return "Tháng trước";
  };

  const handlePlayList = (index) => {
    const list = dataNewMusic.map((item, index1) => {
      if (index === index1) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });

    const tmp = JSON.stringify(list).toString();
    localStorage.setItem("playList", tmp);

    dispatch({ type: "ADDPLAYLIST", payload: list });
    dispatch({ type: "FIRSTPLAY" });
  };
  return (
    <div className='px-2 py-3'>
      <div className='py-3 flex justify-between'>
        <p className='font-semibold text-lg'>Mới Phát Hành</p>
        <Link
          href='/newmusic'
          className='flex text-xs items-center hover:text-red-400'>
          <p>TẤT CẢ</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-3 h-3'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </Link>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
        {listNewMusic
          ? listNewMusic.map((item, index) => (
              <div className='' key={index}>
                <div className='flex gap-2 items-center 	hover:bg-slate-300/75 p-2  rounded-md group'>
                  <div
                    className='relative cursor-pointer shrink-0'
                    onClick={() => {
                      handlePlayList(index);
                    }}>
                    <Image
                      src={item.image_music}
                      alt={item.slug_name_music}
                      width={60}
                      height={60}
                      className='rounded-md w-auto  '
                    />
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 20 20'
                      fill='currentColor'
                      className='w-5 h-5 absolute text-white  hidden cursor-pointer group-hover:block'
                      style={{
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}>
                      <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
                    </svg>
                  </div>
                  <div>
                    <p className='line-clamp-1 font-medium'>
                      {item.name_music}
                    </p>
                    <p className='line-clamp-1 text-xs text-gray-500'>
                      {item.name_singer}
                    </p>
                    <p className='mt-1 line-clamp-1 text-xs text-gray-500'>
                      {msToTime(item.updatedAt)}
                    </p>
                  </div>
                </div>
                <div className='divider m-0'></div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default NewMusic;
