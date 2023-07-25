"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";
import styles from "../css/components/ArtistTrending.module.scss";
import { AppContext } from "../context/context";
import AddPersonalPlaylist from "./AddPersonalPlaylist";

// Icon
import {
  MoreInfoIcon,
  DownloadIcon,
  MVIcon,
  DetailIcon,
  HeartOutlineIcon,
} from "@/svg/svg";
//AntDesign
import { Dropdown, Space } from "antd";

const ArtistTrendingComp = ({
  playlist,
  srcImage,
  altImage,
  title1,
  title2,
}) => {
  const items = [
    {
      label: (
        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium'>
          <DownloadIcon className='w-6 h-6' />
          <button>Tải xuống</button>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium'>
          <MVIcon className='w-6 h-6' />
          <button>Xem MV</button>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium'
          onClick={() => {
            if (state.personPlaylist) {
              handleClickOpen();
            }
          }}>
          <DetailIcon className='w-6 h-6' />
          <button>Thêm vào Playlist</button>
        </div>
      ),
      key: "3",
    },
  ];

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

          <HeartOutlineIcon className='w-5 h-5 cursor-pointer  hover:text-yellow-200' />
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

          <Dropdown
            menu={{
              items,
            }}
            placement='bottom'
            arrow={true}
            trigger={["click"]}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <MoreInfoIcon className='w-6 h-6 cursor-pointer hover:text-yellow-200' />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <p className='capitalize line-clamp-1 mt-3 '>{title1}</p>
      <p className='capitalize line-clamp-1 mt-3 text-xs text-gray-500'>
        {title2}
      </p>
      <Dialog
        className=''
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
          <div className='flex justify-between items-center'>
            <p>Thêm vào Playlist</p>
            <IconButton
              onClick={() => {
                handleClose();
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
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </IconButton>
          </div>
        </DialogTitle>
        <DialogContent className='mt-3 configScrollbar'>
          <AddPersonalPlaylist listMusic={playlist} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ArtistTrendingComp;
