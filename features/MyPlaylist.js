"use client";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  urlCreatePlaylist,
  urlGetPlaylist,
  urlGetAllPlaylist,
} from "@/api/allApi";
import { AppContext } from "@/context/context";
const MyPlaylist = () => {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    const fetchGetAllPlaylist = async (token) => {
      const res = await axios.get(urlGetAllPlaylist, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
    };
    if (state.userLogged) {
      const accessToken = localStorage.getItem("accessKey");

      fetchGetAllPlaylist(accessToken);
    }
  }, [state.userLogged]);

  const handleCreatePlaylist = async () => {
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.post(
      urlCreatePlaylist,
      {
        idMusic: "64ad6ec69a4faf00084a816e",
        nameList: "Demo playlist",
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // idMusic là id của music chứ k phải tự tạo
    console.log(res.data);
  };

  const handleGetPlaylist = async () => {
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.get(
      `${urlGetPlaylist}?_id=64b2c66585040000080469b4`,

      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    // idMusic là id của music chứ k phải tự tạo
    console.log(res.data.data.array_music);
  };
  return (
    <div className='flex flex-col'>
      <button onClick={() => handleCreatePlaylist()}>Create Playlist</button>
      <button onClick={() => handleGetPlaylist()}>Get Playlist</button>
    </div>
  );
};

export default MyPlaylist;
