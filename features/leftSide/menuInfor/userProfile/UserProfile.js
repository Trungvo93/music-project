"use client";
import { Button, Modal } from "antd";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import LoginComp from "@/features/header/login/LoginComp";
import { AppContext } from "@/context/context";
import SkeletonUserProfile from "@/features/leftSide/menuInfor/userProfile/SkeletonUserProfile";
import UserProfileComp from "@/features/leftSide/menuInfor/userProfile/UserProfileComp";
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
      <Modal
        closeIcon={null}
        mask={false}
        footer={null}
        title={
          <div className='flex justify-between items-center text-blue-700 border-b-2 border-stone-100 pb-2'>
            <p className='text-blue-700'>{"Đăng nhập để sử dụng"}</p>
            <Button
              className='flex justify-center items-center'
              type='text'
              shape='circle'>
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
            </Button>
          </div>
        }
        open={openRemindLogin}
        onCancel={handleClickCloseRemindLogin}>
        <LoginComp />
      </Modal>
    </div>
  );
};

export default UserProfile;
