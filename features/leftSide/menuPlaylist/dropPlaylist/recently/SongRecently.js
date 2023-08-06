"use client";
import { urlGetRecentlySongs } from "@/api/allApi";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/context";
import useSWR from "swr";
import Image from "next/image";
import { PlayIcon } from "@/svg/svg";
const fetchRecentlySongs = async (urlGetRecentlySongs, accessToken) => {
  if (accessToken) {
    return await axios
      .get(`${urlGetRecentlySongs}?_limit=20`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  } else return;
};

const SongRecently = async () => {
  const { state, dispatch } = useContext(AppContext);
  const [accessToken, setAccessToken] = useState();
  // Get accessToken
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("accessKey");
    setAccessToken(item);
  }, [state.userLogged]);

  const { data: dataRecentlySongs, error: errorRecentlySongs } = useSWR(
    [urlGetRecentlySongs, accessToken],
    ([url, token]) => fetchRecentlySongs(url, token)
  );

  const handlePlay = (item) => {
    const newArray = [item];
    const list = newArray.map((item, index) => {
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
  };

  return (
    <div className='m-3'>
      <div className=''>
        <h1>Phát gần đây</h1>
      </div>
      <div className='grid grid-cols-2  sm:grid-cols-4 lg:grid-cols-5  justify-center gap-3'>
        {dataRecentlySongs
          ? dataRecentlySongs.map((element, index) => (
              <div key={index} className=' '>
                <div className='relative  overflow-hidden cursor-pointer	rounded-lg drop-shadow-md group'>
                  <div className='absolute w-full h-full  bg-black opacity-30 -z-10 group-hover:z-10'></div>
                  <div className='h-[150px] md:h-[250px] w-full overflow-hidden relative'>
                    <Image
                      src={element.music.image_music}
                      alt={element.music.slug_name_music}
                      fill
                      sizes={"500px"}
                      className='duration-700 object-cover group-hover:scale-125 w-full h-full '
                    />
                  </div>
                  <div
                    onClick={() => {
                      handlePlay(element.music);
                    }}>
                    <PlayIcon className='w-20 h-20 text-white group-hover:z-40 hover:text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer -z-10' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p>{element.music.name_music}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default SongRecently;
