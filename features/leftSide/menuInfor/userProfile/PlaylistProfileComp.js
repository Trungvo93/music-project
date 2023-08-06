import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context/context";
import Image from "next/image";
import { PlayIcon, PlayIconV2 } from "@/svg/svg";
import axios from "axios";
import { urlGetPlaylist } from "@/api/allApi";
const PlaylistProfileComp = () => {
  const { state, dispatch } = useContext(AppContext);
  const handleAddPlaylist = (playlist) => {
    const list = playlist.map((item, index) => {
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

  const handlePlay = async (idPlaylist) => {
    try {
      const accessToken = localStorage.getItem("accessKey");
      const res = await axios.get(
        `${urlGetPlaylist}?_id=${idPlaylist}`,

        { headers: { Authorization: `Bearer ${accessToken}` } }
      );

      const playlist = [];
      res.data.data.array_music.forEach((item) => {
        playlist.push(item.music);
      });
      handleAddPlaylist(playlist);
    } catch (error) {
      console.log("PlaylistProfileComp: ", error);
    }
  };
  return (
    <div>
      <div className='mb-2'>
        <p className='text-blue-500 text-xl font-medium'>PLAYLIST | ALBUM</p>
      </div>
      <div className='grid grid-cols-6 gap-4'>
        {state.personPlaylist
          ? state.personPlaylist.map((element, index) => (
              <div key={index} className=' '>
                <div className='relative rounded overflow-hidden  group'>
                  <div className='absolute w-full h-full  bg-black opacity-30 -z-10 group-hover:z-10'></div>
                  <Image
                    src={element.image_list}
                    alt={element.name_list}
                    width={1000}
                    height={0}
                    className='object-cover w-auto '
                  />
                  <div
                    onClick={() => {
                      handlePlay(element._id);
                    }}>
                    <PlayIcon className='w-20 h-20 text-white group-hover:z-40 hover:text-yellow-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer -z-10' />
                  </div>
                </div>

                <div className='mt-3'>
                  <p>{element.name_list}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default PlaylistProfileComp;
