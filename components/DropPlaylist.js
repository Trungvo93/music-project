"use client";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  urlCreatePlaylist,
  urlGetPlaylist,
  urlGetAllPlaylist,
} from "@/api/allApi";
import { AppContext } from "@/context/context";
import Link from "next/link";
const DropPlaylist = () => {
  const { state, dispatch } = useContext(AppContext);
  const [allUserPlaylist, setAllUserPlaylist] = useState();
  useEffect(() => {
    const fetchGetAllPlaylist = async (token) => {
      const res = await axios.get(urlGetAllPlaylist, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAllUserPlaylist(res.data.data);
    };
    if (state.userLogged) {
      const accessToken = localStorage.getItem("accessKey");

      fetchGetAllPlaylist(accessToken);
    }
  }, [state.userLogged]);

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
  };
  return (
    <div>
      {allUserPlaylist
        ? allUserPlaylist.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center hover:bg-slate-600/50 hover:text-white p-2 rounded-md'>
              <Link href='#' className='hover:text-yellow-400'>
                {item.name_list}
              </Link>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 hover:text-yellow-400 cursor-pointer '
                onClick={() => {
                  handlePlay(item._id);
                }}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                />
              </svg>
            </div>
          ))
        : ""}
    </div>
  );
};

export default DropPlaylist;
