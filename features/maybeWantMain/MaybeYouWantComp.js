"use client";

import Image from "next/image";
import { useContext, useState } from "react";
import { AppContext } from "@/context/context";
import {
  CloseIcon,
  DetailIcon,
  DownloadIcon,
  HeartOutlineIcon,
  MoreInfoIcon,
  MVIcon,
  PlayIcon,
} from "@/svg/svg";
import { Button, Dropdown, Modal, Space } from "antd";
import AddPersonalPlaylist from "@/components/AddPersonalPlaylist";
const MaybeYouWantComp = ({ playlist, srcImage, altImage }) => {
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
          className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium '
          onClick={() => {
            if (state.personPlaylist) {
              handleClickOpenDialog();
            }
          }}>
          <DetailIcon className='w-6 h-6' />
          <button className='whitespace-nowrap'>Thêm vào Playlist</button>
        </div>
      ),
      key: "3",
    },
  ];
  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
          height={0}
          className='duration-700 object-cover group-hover:scale-125 '
        />
        <div
          className='absolute flex text-white w-full gap-2 justify-between px-2 lg:px-5 items-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10
          group-hover:z-30 '>
          {/* Favorite */}
          <HeartOutlineIcon className='w-5 h-5 cursor-pointer  hover:text-yellow-200' />

          {/* Playbutton */}
          <div onClick={() => handleAddPlaylist()}>
            <PlayIcon className='w-12 h-12 hover:text-yellow-200	' />
          </div>

          <Dropdown
            menu={{
              items,
            }}
            placement='bottom'
            arrow={true}
            trigger={["click"]}>
            <a
              onClick={(e) => {
                e.preventDefault();
              }}>
              <Space>
                <MoreInfoIcon className='w-6 h-6 cursor-pointer hover:text-yellow-200' />
              </Space>
            </a>
          </Dropdown>

          <Modal
            closeIcon={null}
            mask={false}
            footer={null}
            title={
              <div className='flex justify-between items-center text-blue-700 border-b-2 border-stone-100 pb-2'>
                <p>Thêm vào Playlist</p>
                <Button
                  className='flex justify-center items-center'
                  type='text'
                  shape='circle'
                  onClick={() => {
                    handleCloseDialog();
                  }}
                  icon={<CloseIcon className='w-5 h-5' />}></Button>
              </div>
            }
            open={openDialog}
            onCancel={handleCloseDialog}>
            <AddPersonalPlaylist listMusic={playlist} />
          </Modal>
        </div>
      </div>
      <p className='capitalize line-clamp-1 mt-3 text-xs text-gray-500'>
        {playlist ? playlist.map((item, index) => item.name_singer + ", ") : ""}
      </p>
    </div>
  );
};

export default MaybeYouWantComp;
