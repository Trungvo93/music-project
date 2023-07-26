"use client";
import Image from "next/image";
import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/context";
import { auth, provider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import axios from "axios";
import LoginComp from "./LoginComp";
import RegisterComp from "./RegisterComp";
import { urlProfile } from "../api/allApi";
import { ExitIcon, Person2Icon } from "@/svg/svg";
import { Button, Modal } from "antd";

const Login = () => {
  const { state, dispatch } = useContext(AppContext);
  const [openDialogLogout, setopenDialogLogout] = useState(false);
  const [openDialogLogin, setopenDialogLogin] = useState(false);
  const [switchRegister, setSwitchRegister] = useState(false);
  const [loadingLogout, setLoadingLogout] = useState(false);

  //Switch Component Register and Login
  const handleSwitchRegister = () => {
    setSwitchRegister(!switchRegister);
  };
  //Check logged
  useEffect(() => {
    const checkLogged = localStorage.getItem("accessKey");
    const fetchProfile = async (token) => {
      const res = await axios.get(urlProfile, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "ADDUSERLOGIN", payload: res.data.data });
    };
    if (checkLogged) {
      dispatch("SWITCHTOLOGIN");
      fetchProfile(checkLogged);
    } else {
      dispatch("SWITCHTOLOGOUT");
    }
  }, []);

  //Logout
  const handleClickopenDialogLogout = () => {
    setopenDialogLogout(true);
  };

  const handleCloseDialogLogout = () => {
    setopenDialogLogout(false);
  };

  //Login
  const handleClickopenDialogLogin = () => {
    setopenDialogLogin(true);
  };

  const handleCloseDialogLogin = () => {
    setopenDialogLogin(false);
  };

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
      })
      .catch(function (error) {
        console.error("Error: hande error here>>>", error.code);
      });
  };

  const handleSignOut = () => {
    setLoadingLogout(true);
    setTimeout(() => {
      setLoadingLogout(false);
      dispatch({
        type: "REMOVEUSERLOGIN",
      });
      dispatch({ type: "SWITCHTOLOGOUT" });
      localStorage.removeItem("infoAccount");
      localStorage.removeItem("accessKey");
      handleCloseDialogLogout();
    }, 500);
  };
  useEffect(() => {
    if (state.isLogin) {
      handleCloseDialogLogin();
    }
  }, [state.isLogin]);
  //Get infor account google logined
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       setUserLogged(user);
  //       dispatch({ type: "ADDUSERLOGIN", payload: user });
  //     } else {
  //       dispatch({ type: "REMOVEUSERLOGIN" });
  //     }
  //   });
  // }, []);

  return (
    <div className='h-10 w-10'>
      {state.userLogged ? (
        <div className='dropdown dropdown-end text-white '>
          <label tabIndex={0} className=''>
            <Image
              src={state.userLogged.image}
              alt={state.userLogged.user_name}
              width={50}
              height={50}
              className='rounded-full cursor-pointer hover:brightness-95	h-10 w-10 object-cover'
            />
          </label>
          <div
            tabIndex={0}
            className='dropdown-content z-[1] mt-2 menu p-2 shadow bg-gray-600 rounded-box '>
            <div className='text-center m-2'>
              <p>{state.userLogged.user_name}</p>
            </div>
            <div className='text-center m-2'>
              <p>{state.userLogged.email}</p>
            </div>
            <div
              className='flex items-center gap-2 hover:text-yellow-400 m-2 justify-center cursor-pointer'
              onClick={handleClickopenDialogLogout}>
              <ExitIcon className='w-4 h-4 ' />
              <button>Đăng xuất</button>
            </div>
          </div>
        </div>
      ) : (
        <div
          className='p-3 bg-slate-500/30 rounded-full relative cursor-pointer hover:brightness-95	'
          onClick={handleClickopenDialogLogin}>
          <Person2Icon className='w-4 h-4' />
        </div>
      )}

      {/* Dialog login */}
      <Modal
        closeIcon={null}
        mask={false}
        footer={null}
        title={
          <div className='text-blue-700 border-b-2 border-stone-100'>
            {switchRegister ? "Đăng ký" : "Đăng nhập"}
          </div>
        }
        open={openDialogLogin}
        onCancel={handleCloseDialogLogin}>
        {switchRegister ? <RegisterComp /> : <LoginComp />}

        {switchRegister ? (
          <button
            className='btn btn-outline btn-secondary w-full my-2'
            onClick={handleSwitchRegister}>
            Đăng nhập
          </button>
        ) : (
          <button
            className='btn btn-outline btn-secondary w-full my-2'
            onClick={handleSwitchRegister}>
            Đăng ký
          </button>
        )}
      </Modal>

      {/* Dialog logout */}
      <Modal
        closeIcon={null}
        mask={false}
        title={
          <div className='text-blue-700 border-b-2 border-stone-100'>
            {"Xác nhận đăng xuất"}
          </div>
        }
        open={openDialogLogout}
        onCancel={handleCloseDialogLogout}
        onOk={handleSignOut}
        footer={[
          <Button
            type='dashed'
            key='back'
            onClick={handleCloseDialogLogout}
            className='uppercase text-blue-600 font-semibold	'>
            Không
          </Button>,
          <Button
            key='submit'
            onClick={handleSignOut}
            autoFocus
            type='primary'
            danger
            loading={loadingLogout}
            className='uppercase font-semibold inline-flex justify-center items-center 	'>
            <span>Đăng xuất</span>
          </Button>,
        ]}>
        Bạn có chắc chắn muốn đăng xuất tài khoản!
      </Modal>
    </div>
  );
};

export default Login;
