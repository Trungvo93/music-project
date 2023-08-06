"use client";
import { PlayIcon } from "@/svg/svg";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "@/context/context";

const NewMusicPageComp = ({ listMusic }) => {
  const { state, dispatch } = useContext(AppContext);
  const handleAddPlaylist = () => {
    if (listMusic) {
      const list = listMusic.map((item, index) => {
        if (index === 0) {
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
    }
  };
  return (
    <div className='m-6'>
      <div className='my-5 flex items-center gap-3'>
        <p className='text-2xl font-semibold'>Nhạc Mới</p>
        <div
          onClick={() => {
            handleAddPlaylist();
          }}>
          <PlayIcon className='w-8 h-8 hover:text-orange-400 cursor-pointer' />
        </div>
      </div>
      <div>
        {listMusic
          ? listMusic.map((item, index) => (
              <div key={index}>
                <div className='flex items-center gap-4 m-3'>
                  <div className='flex-none w-10 h-10 flex items-center justify-center'>
                    <p
                      className={`text-xl font-semibold ${
                        index === 0 ? "text-[#FF0000]" : ""
                      } ${index === 1 ? "text-[#216666]" : ""} ${
                        index === 2 ? "text-[#ffa500]" : ""
                      }`}>
                      {index + 1}
                    </p>
                  </div>
                  <Image
                    src={item.image_music}
                    width={60}
                    height={60}
                    alt={item.slug_name_music}
                    className='rounded-md shadow h-auto w-auto'
                  />
                  <div className='w-full '>
                    <p className='line-clamp-1 font-medium capitalize'>
                      {item.name_music}
                    </p>
                    <p className='line-clamp-1 text-xs text-gray-500 capitalize'>
                      {item.name_singer}
                    </p>
                  </div>
                </div>
                <div className='divider my-0 ms-14'></div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default NewMusicPageComp;
