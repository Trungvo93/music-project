"use client";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../context/context";
import Link from "next/link";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import {
  urlDeletePlaylist,
  urlGetPlaylist,
  urlCreatePlaylist,
  urlAddItemPlaylist,
} from "@/api/allApi";
import axios from "axios";
import { async } from "@firebase/util";
const AddPersonalPlaylist = ({ item }) => {
  const { state, dispatch } = useContext(AppContext);
  //Config dialog deleted
  const [itemDelete, setItemDelete] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const handleClickOpenDeleteDialog = (item) => {
    setOpenDeleteDialog(true);
    setItemDelete(item);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setItemDelete(undefined);
  };

  const handleDeleteList = async (idPlaylist) => {
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.delete(`${urlDeletePlaylist}?_id=${idPlaylist}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    handleCloseDeleteDialog();
  };

  // Create New Personal Playlist
  const [newNamelist, setNewNamelist] = useState("");
  const [openCreate, setOpenCreate] = useState(false);
  const handleChangeNamelist = (e) => {
    setNewNamelist(e.target.value);
  };
  const handleClickOpenCreateDialog = () => {
    setOpenCreate(true);
  };

  const handleCloseCreateDialog = () => {
    setOpenCreate(false);
    setNewNamelist("");
  };
  const handleCreatePlaylist = async (item) => {
    const accessToken = localStorage.getItem("accessKey");
    if (Array.isArray(item)) {
      const firstItem = item[0];
      const otherItems = item.slice(1, item.length);
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
          idMusic: item._id,
          nameList: newNamelist,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    }
    handleCloseCreateDialog();
  };

  const handleAddToPlaylist = async (e) => {
    const accessToken = localStorage.getItem("accessKey");
    if (Array.isArray(item)) {
      const resPromise = await Promise.all(
        item.map(async (element) => {
          const result = await axios.put(
            urlAddItemPlaylist,
            {
              _id: e._id,
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
          _id: e._id,
          _id_music: element._id,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      );
    }
  };
  return (
    <div>
      <button
        className='btn btn-warning  my-2 text-xs'
        onClick={() => {
          handleClickOpenCreateDialog();
        }}>
        Tạo mới Playlist
      </button>
      {/* Create dialog */}
      <Dialog
        open={openCreate}
        onClose={handleCloseCreateDialog}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle
          id='alert-dialog-title'
          className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
          Tên playlist mới
        </DialogTitle>
        <DialogContent className='mt-3'>
          <input
            type='text'
            required
            placeholder='Nhập tên playlist'
            className='input input-bordered input-info w-full mt-3'
            value={newNamelist}
            onChange={handleChangeNamelist}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreateDialog}>Hủy</Button>
          <Button
            onClick={() => handleCreatePlaylist(item)}
            autoFocus
            variant='contained'
            color='success'
            type='submit'>
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
      <div>
        {state.personPlaylist.map((e, index) => (
          <div
            key={index}
            className='flex justify-between items-center hover:bg-slate-600/50 hover:text-white p-2 rounded-md'>
            <Link href='#' className='hover:text-yellow-400'>
              {e.name_list}
            </Link>
            <div className='flex flex-nowrap gap-4'>
              {/* Add to playlist */}
              <svg
                onClick={() => handleAddToPlaylist(e)}
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-6 h-6 cursor-pointer hover:text-yellow-400 shrink-0'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M12 6v12m6-6H6'
                />
              </svg>

              {/* Edit name playlist */}
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
                  d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125'
                />
              </svg>

              {/* Action delete playlist */}

              <div>
                <button
                  onClick={() => {
                    handleClickOpenDeleteDialog(e);
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
                <Dialog
                  open={openDeleteDialog}
                  onClose={handleCloseDeleteDialog}
                  aria-labelledby='alert-dialog-title'
                  aria-describedby='alert-dialog-description'>
                  <DialogTitle id='alert-dialog-title'>Xác nhận</DialogTitle>
                  <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                      Bạn chắc chắn muốn xóa playlist này?!
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteDialog}>Không</Button>
                    <Button
                      variant='outlined'
                      color='error'
                      onClick={() => handleDeleteList(itemDelete._id)}
                      autoFocus>
                      Có
                    </Button>
                  </DialogActions>
                </Dialog>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddPersonalPlaylist;
