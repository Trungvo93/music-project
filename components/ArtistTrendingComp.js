"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import {
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";
import styles from "../css/components/ArtistTrending.module.scss";
import { AppContext } from "../context/context";
import AddPersonalPlaylist from "./AddPersonalPlaylist";
const ArtistTrendingComp = ({
  playlist,
  srcImage,
  altImage,
  title1,
  title2,
}) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { state, dispatch } = useContext(AppContext);
  const handleAddPlaylist = () => {
    if (playlist) {
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
    }
  };

  return (
    <div>
      <div className='  relative  overflow-hidden cursor-pointer	rounded-lg drop-shadow-md group'>
        <div className='  w-full h-full absolute inset-0 -z-10 group-hover:z-10 bg-[#000000] opacity-30'></div>
        <Image
          src={srcImage}
          alt={altImage}
          width={500}
          height={500}
          className='duration-700 object-cover group-hover:scale-125 '
        />
        <div
          className='absolute flex text-white w-full gap-2 justify-between px-2 lg:px-5 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10
          group-hover:z-30 '>
          {/* Favorite */}
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-5 h-5 cursor-pointer  hover:text-yellow-200'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>

          {/* Playbutton */}
          <svg
            onClick={() => handleAddPlaylist()}
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-12 h-12 hover:text-yellow-200	'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
            />
          </svg>

          <Tooltip
            title={
              <div className='grid gap-y-3 p-2'>
                <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-200'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                    />
                  </svg>
                  <button>Tải xuống</button>
                </div>

                <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-200'>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
                    />
                  </svg>
                  <button>Xem MV</button>
                </div>
                <div
                  className='flex items-center gap-2 cursor-pointer hover:text-yellow-200'
                  onClick={() => {
                    handleClickOpen();
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                    />
                  </svg>
                  <button>Thêm vào Playlist</button>
                </div>
              </div>
            }>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 cursor-pointer'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
              />
            </svg>
          </Tooltip>
        </div>
      </div>
      <p className='capitalize line-clamp-1 mt-3 '>{title1}</p>
      <p className='capitalize line-clamp-1 mt-3 text-xs text-gray-500'>
        {title2}
      </p>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
          <div className='flex justify-between items-center'>
            <p>Thêm vào Playlist</p>
            <IconButton>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6'
                onClick={() => {
                  handleClose();
                }}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className='mt-3'>
          <AddPersonalPlaylist item={playlist} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtistTrendingComp;
