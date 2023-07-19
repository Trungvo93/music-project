"use client";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { urlFavoriteMusic } from "@/api/allApi";
import { AppContext } from "@/context/context";

const MyPlaylist = () => {
  const { state, dispatch } = useContext(AppContext);

  const handleShowFavorite = async () => {
    const res = await axios.get(urlFavoriteMusic, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log(res.data.data);
  };
  return (
    <div className='flex flex-col'>
      <button onClick={() => handleShowFavorite()}>Show favorite</button>
    </div>
  );
};

export default MyPlaylist;
