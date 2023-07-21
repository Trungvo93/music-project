"use client";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { urlFavoriteMusic } from "@/api/allApi";
import { AppContext } from "@/context/context";

const MyPlaylist = () => {
  const { state, dispatch } = useContext(AppContext);

  const links = [
    "https://res.cloudinary.com/phuockaito/video/upload/v1664959881/audio/qpntmtwickhgeg75egbu.mp3",
    "https://res.cloudinary.com/phuockaito/video/upload/v1664964713/audio/fvsxsx2hfn7kqoqony37.mp3",
    "https://res.cloudinary.com/phuockaito/video/upload/v1657265009/audio/ox6fb6rwkhrcabcjbm6x.mp3",
  ];
  const handleDownload = () => {
    const index = links[0].search("upload");
    const newItem =
      links[0].slice(0, index) +
      "upload/fl_attachment" +
      links[0].slice(index + 6);
    let link = document.createElement("a");
    link.setAttribute("href", newItem);
    link.click();
  };
  return (
    <div className='flex flex-col'>
      <button onClick={() => handleDownload()}>Tải xuống</button>
    </div>
  );
};

export default MyPlaylist;
