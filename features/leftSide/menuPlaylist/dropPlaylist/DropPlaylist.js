"use client";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  urlCreatePlaylist,
  urlGetPlaylist,
  urlGetAllPlaylist,
  urlDeletePlaylist,
} from "@/api/allApi";
import { AppContext } from "@/context/context";
import Link from "next/link";
import { Button, Modal } from "antd";
import { DeleteIcon, PlayIconV2 } from "@/svg/svg";
const fetchWithToken = async (urlGetAllPlaylist, accessToken) => {
  if (accessToken) {
    return await axios
      .get(urlGetAllPlaylist, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  } else {
    return;
  }
};
const DropPlaylist = () => {
  const { state, dispatch } = useContext(AppContext);
  const [accessToken, setAccessToken] = useState();
  const {
    data: dataUserPlaylist,
    error: errorUserPlaylist,
    mutate,
  } = useSWR([urlGetAllPlaylist, accessToken], ([url, token]) =>
    fetchWithToken(url, token)
  );
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("accessKey");
    setAccessToken(item);
  }, [state.userLogged]);

  useEffect(() => {
    dispatch({ type: "UPDATEPERSONPLAYLIST", payload: dataUserPlaylist });
  }, [dataUserPlaylist]);

  //Config dialog deleted
  const [itemDelete, setItemDelete] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isFetchingDeletelist, setIsFetchingDeletelist] = useState(false);

  const handleClickOpenDeleteDialog = (item) => {
    setOpenDeleteDialog(true);
    setItemDelete(item);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setItemDelete(undefined);
  };

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
      console.log("DropPlaylist: ", error);
    }
  };

  const handleDeleteList = async (idPlaylist) => {
    setIsFetchingDeletelist(true);
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.delete(`${urlDeletePlaylist}?_id=${idPlaylist}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    mutate();
    setIsFetchingDeletelist(false);
    handleCloseDeleteDialog();
  };
  return (
    <div>
      {dataUserPlaylist
        ? dataUserPlaylist.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center hover:bg-slate-600/50 hover:text-white p-2 rounded-md'>
              <div className='hover:text-yellow-400'>{item.name_list}</div>
              <div className='flex flex-nowrap gap-2'>
                {/* Action play */}
                <div
                  onClick={() => {
                    handlePlay(item._id);
                  }}>
                  <PlayIconV2 className='w-5 h-5 hover:text-yellow-400 cursor-pointer shrink-0' />
                </div>
                {/* Delete playlist */}
                <div>
                  <button
                    onClick={() => {
                      handleClickOpenDeleteDialog(item);
                    }}>
                    <DeleteIcon className='w-5 h-5 cursor-pointer hover:text-yellow-400 shrink-0' />
                  </button>

                  <Modal
                    open={openDeleteDialog}
                    onCancel={handleCloseDeleteDialog}
                    title='Xác nhận'
                    footer={
                      <div className='flex items-center justify-end'>
                        <Button
                          key='back'
                          type='dashed'
                          onClick={handleCloseDeleteDialog}>
                          Không
                        </Button>
                        <Button
                          type='primary'
                          danger
                          key='confirm'
                          onClick={() => handleDeleteList(itemDelete._id)}
                          autoFocus
                          className='inline-flex justify-center items-center'
                          loading={isFetchingDeletelist}>
                          <span>Có</span>
                        </Button>
                      </div>
                    }>
                    Bạn chắc chắn muốn xóa playlist này?!
                  </Modal>
                </div>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default DropPlaylist;
