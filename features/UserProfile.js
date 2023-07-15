"use client";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import LoginComp from "@/components/LoginComp";
import { AppContext } from "@/context/context";
import SkeletonUserProfile from "@/components/SkeletonUserProfile";
import UserProfileComp from "@/components/UserProfileComp";
const UserProfile = () => {
  const { state, dispatch } = useContext(AppContext);
  const [openRemindLogin, setOpenRemindLogin] = useState(false);
  const handleClickOpenRemindLogin = () => {
    setOpenRemindLogin(true);
  };

  const handleClickCloseRemindLogin = () => {
    setOpenRemindLogin(false);
  };
  useEffect(() => {
    const checkLogged = localStorage.getItem("accessKey") ? true : false;
    if (checkLogged === false) {
      handleClickOpenRemindLogin();
    }
  }, [state.userLogged]);
  useEffect(() => {
    if (state.isLogin) {
      handleClickCloseRemindLogin();
    }
  }, [state.isLogin]);
  return (
    <div>
      <div>
        {state.userLogged ? <UserProfileComp /> : <SkeletonUserProfile />}
      </div>
      <Dialog
        open={openRemindLogin}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle
          id='alert-dialog-title'
          className='flex justify-between border-b-2 border-stone-100 p-0 m-2 '>
          <p className='text-blue-700'>{"Đăng nhập để sử dụng"}</p>
          <IconButton>
            <Link href='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 hover:text-rose-500'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </Link>
          </IconButton>
        </DialogTitle>
        <DialogContent className='md:w-[500px] w-auto'>
          <LoginComp />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserProfile;
