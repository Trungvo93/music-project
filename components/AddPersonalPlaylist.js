"use client";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "@/context/context";
import Link from "next/link";
import useSWR from "swr";

import { Button, Modal } from "antd";

import {
  urlGetAllPlaylist,
  urlDeletePlaylist,
  urlGetPlaylist,
  urlCreatePlaylist,
  urlAddItemPlaylist,
  urlChangeNamePlaylist,
} from "@/api/allApi";
import axios from "axios";
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
const AddPersonalPlaylist = ({ listMusic }) => {
  const { state, dispatch } = useContext(AppContext);
  //Config dialog deleted
  const [itemDelete, setItemDelete] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isFetchingDeletelist, setIsFetchingDeletelist] = useState(false);
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

  const handleClickOpenDeleteDialog = (itemPersonPlaylist) => {
    setOpenDeleteDialog(true);
    setItemDelete(itemPersonPlaylist);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setItemDelete(undefined);
  };

  const handleDeleteList = async (idPlaylist) => {
    setIsFetchingDeletelist(true);
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.delete(`${urlDeletePlaylist}?_id=${idPlaylist}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    await mutate();
    setIsFetchingDeletelist(false);
    handleCloseDeleteDialog();
  };

  // Create New Personal Playlist
  const [newNamelist, setNewNamelist] = useState("");
  const [isFetchingNewList, setIsFetchingNewList] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const handleChangeNamelist = (e) => {
    setNewNamelist(e.target.value);
  };
  const handleClickOpenCreateDialog = () => {
    setOpenCreate(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreate(false);
  };
  useEffect(() => {
    if (openCreate !== false) {
      setNewNamelist("");
    }
  }, [openCreate]);
  const handleCreatePlaylist = async (listMusic) => {
    if (newNamelist) {
      setIsFetchingNewList(true);
      const accessToken = localStorage.getItem("accessKey");
      if (Array.isArray(listMusic)) {
        const firstItem = listMusic[0];
        const otherItems = listMusic.slice(1, listMusic.length);
        const firstRes = await axios.post(
          urlCreatePlaylist,
          {
            idMusic: firstItem._id,
            nameList: newNamelist,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        const resPromise = await Promise.all(
          otherItems.map(async (e) => {
            const result = await axios.put(
              urlAddItemPlaylist,
              {
                _id: firstRes.data.data._id,
                _id_music: e._id,
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            return result;
          })
        );
      } else {
        const res = await axios.post(
          urlCreatePlaylist,
          {
            idMusic: listMusic._id,
            nameList: newNamelist,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
      }
      await mutate();
      setIsFetchingNewList(false);
      handleCloseCreateDialog();
    }
  };

  const handleAddToPlaylist = async (itemPersonPlaylist) => {
    document
      .querySelectorAll(`.successAddlist${itemPersonPlaylist._id}`)
      .forEach((i) => (i.style.display = "none"));
    document
      .querySelectorAll(`.fetchingAddlist${itemPersonPlaylist._id}`)
      .forEach((i) => (i.style.display = "block"));
    const accessToken = localStorage.getItem("accessKey");
    if (Array.isArray(listMusic)) {
      const resPromise = await Promise.all(
        listMusic.map(async (element) => {
          const result = await axios.put(
            urlAddItemPlaylist,
            {
              _id: itemPersonPlaylist._id,
              _id_music: element._id,
            },
            { headers: { Authorization: `Bearer ${accessToken}` } }
          );
          return result;
        })
      );
    } else {
      const res = await axios.put(
        urlAddItemPlaylist,
        {
          _id: itemPersonPlaylist._id,
          _id_music: listMusic._id,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    }
    document
      .querySelectorAll(`.fetchingAddlist${itemPersonPlaylist._id}`)
      .forEach((i) => (i.style.display = "none"));
    document
      .querySelectorAll(`.successAddlist${itemPersonPlaylist._id}`)
      .forEach((i) => (i.style.display = "block"));
  };

  //Edit name playlist
  const [newEditName, setNewEditName] = useState("");
  const [isFetchingEditName, setIsFetchingEditName] = useState(false);

  const [idItemEditName, setIdItemEditName] = useState();
  const [openEditName, setOpenEditName] = useState(false);
  useEffect(() => {
    if (openEditName !== false) {
      setNewEditName("");
    }
  }, [openEditName]);
  const handleChangeNewEditName = (e) => {
    setNewEditName(e.target.value);
  };
  const handleClickOpenEditName = (itemPersonPlaylist) => {
    setNewEditName(itemPersonPlaylist.name_list);
    setIdItemEditName(itemPersonPlaylist._id);
    setOpenEditName(true);
  };
  const handleClickCloseEditName = () => {
    setOpenEditName(false);
  };
  const handleChangeNamePlaylist = async () => {
    setIsFetchingEditName(true);
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.put(
      urlChangeNamePlaylist,
      {
        nameList: newEditName,
        _id: idItemEditName,
      },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    await mutate();
    setIsFetchingEditName(false);
    setIdItemEditName(undefined);
    handleClickCloseEditName();
  };
  return (
    <div className=''>
      <button
        className='btn btn-warning  my-2 text-xs'
        onClick={() => {
          handleClickOpenCreateDialog();
        }}>
        Tạo mới Playlist
      </button>
      {/* Create dialog */}

      <Modal
        open={openCreate}
        onCancel={handleCloseCreateDialog}
        title={
          <div className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
            <span>Tên playlist mới</span>
          </div>
        }
        footer={
          <div className='flex items-center justify-end'>
            <Button key='back' type='dashed' onClick={handleCloseCreateDialog}>
              Hủy
            </Button>
            <Button
              type='primary'
              danger
              key='confirm'
              onClick={() => handleCreatePlaylist(listMusic)}
              autoFocus
              className='inline-flex justify-center items-center'
              loading={isFetchingNewList}>
              <span>Tạo mới</span>
            </Button>
          </div>
        }>
        <input
          autoFocus
          placeholder='Nhập tên playlist'
          className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-3`}
          value={newNamelist}
          onChange={handleChangeNamelist}
        />
        <p className='mt-3 text-xs text-red-500'>
          {newNamelist ? "" : "Tên playlist không để trống"}
        </p>
      </Modal>
      <div className=''>
        {state.personPlaylist
          ? state.personPlaylist.map((itemPersonPlaylist, index) => (
              <div
                key={index}
                className='flex justify-between items-center hover:bg-slate-600/50 hover:text-white p-2 rounded-md'>
                <Link href='#' className='hover:text-yellow-400 '>
                  {itemPersonPlaylist.name_list}
                </Link>
                <div className='flex flex-nowrap gap-4'>
                  {/* Add to playlist */}
                  <div className='flex items-center '>
                    <span
                      className={`loading loading-spinner loading-sm hidden  shrink-0 fetchingAddlist${itemPersonPlaylist._id}`}></span>

                    <svg
                      onClick={() => handleAddToPlaylist(itemPersonPlaylist)}
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className={`w-6 h-6 cursor-pointer hover:text-yellow-400 shrink-0 successAddlist${itemPersonPlaylist._id}`}>
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        d='M12 6v12m6-6H6'
                      />
                    </svg>
                  </div>

                  {/* Edit name playlist */}
                  <svg
                    onClick={() => handleClickOpenEditName(itemPersonPlaylist)}
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 cursor-pointer hover:text-yellow-400 shrink-0'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                    />
                  </svg>
                  {/* Edit name dialog */}

                  <Modal
                    open={openEditName}
                    onCancel={handleClickCloseEditName}
                    title={
                      <div className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
                        <span>Tên playlist mới</span>
                      </div>
                    }
                    footer={
                      <div className='flex items-center justify-end'>
                        <Button
                          key='back'
                          type='dashed'
                          onClick={handleClickCloseEditName}>
                          Hủy
                        </Button>
                        <Button
                          type='primary'
                          key='confirm'
                          onClick={() => handleChangeNamePlaylist(listMusic)}
                          autoFocus
                          className='inline-flex justify-center items-center bg-blue-400'
                          loading={isFetchingEditName}>
                          <span>Sửa</span>
                        </Button>
                      </div>
                    }>
                    <input
                      autoFocus
                      placeholder='Nhập tên mới'
                      className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm mt-3`}
                      value={newEditName}
                      onChange={handleChangeNewEditName}
                    />
                  </Modal>
                  {/* Action delete playlist */}
                  <div>
                    <button
                      onClick={() => {
                        handleClickOpenDeleteDialog(itemPersonPlaylist);
                      }}>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-5 h-5 cursor-pointer hover:text-yellow-400 shrink-0'>
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                        />
                      </svg>
                    </button>

                    {/* Delete dialog */}
                    <Modal
                      open={openDeleteDialog}
                      onCancel={handleCloseDeleteDialog}
                      title={
                        <div className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
                          <span>Xác nhận</span>
                        </div>
                      }
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
                            className='inline-flex justify-center items-center '
                            loading={isFetchingDeletelist}>
                            <span>Có</span>
                          </Button>
                        </div>
                      }>
                      <span>Bạn chắc chắn muốn xóa playlist này?!</span>
                    </Modal>
                  </div>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default AddPersonalPlaylist;
