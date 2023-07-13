"use client";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import { useState, useEffect, useContext, useRef } from "react";
import { AppContext } from "../context/context";
import { auth, provider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
const Login = () => {
  const { dispatch } = useContext(AppContext);
  const [userLogged, setUserLogged] = useState();
  const [openDialogLogout, setopenDialogLogout] = useState(false);
  const [openDialogLogin, setopenDialogLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleChangeEmail = (e) => {
    setUserLogin({ ...userLogin, email: e.target.value });
  };
  const handleChangePassword = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userLogin);
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
    signOut(auth).then((result) => {
      setUserLogged(undefined);
      setopenDialogLogout(false);
    });
  };

  //Get infor account google logined
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserLogged(user);
        dispatch({ type: "ADDUSERLOGIN", payload: user });
      } else {
        console.log("not logged");
        dispatch({ type: "REMOVEUSERLOGIN" });
      }
    });
  }, []);

  return (
    <div>
      {userLogged ? (
        <Tooltip
          arrow
          title={
            <div className='flex items-center gap-2 '>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-4 h-4 cursor-pointer'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75'
                />
              </svg>

              <button onClick={handleClickopenDialogLogout}>Đăng xuất</button>
            </div>
          }>
          <Image
            src={userLogged.photoURL}
            alt={userLogged.displayName}
            width={50}
            height={50}
            className='rounded-full cursor-pointer hover:brightness-95	h-10 w-10 object-cover'
          />
        </Tooltip>
      ) : (
        <div
          className='p-3 bg-slate-500/30 rounded-full relative cursor-pointer hover:brightness-95	'
          onClick={handleClickopenDialogLogin}>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-4 h-4'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
            />
          </svg>
        </div>
      )}

      {/* Dialog login */}
      <Dialog
        open={openDialogLogin}
        onClose={handleCloseDialogLogin}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle
          id='alert-dialog-title'
          className='text-blue-700 border-b-2 border-stone-100'>
          {"Đăng nhập"}
        </DialogTitle>
        <DialogContent className=''>
          <form onSubmit={handleSubmit}>
            {/* Email input */}
            <div className='relative my-3'>
              <span className='sr-only'>Email</span>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='h-5 w-5 text-slate-400'>
                  <path
                    strokeLinecap='round'
                    d='M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25'
                  />
                </svg>
              </span>
              <input
                autoComplete='off'
                className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
                placeholder='Email đăng nhập'
                type='email'
                name='email'
                required
                onChange={handleChangeEmail}
                value={userLogin.email}
              />
            </div>

            {/* Password input */}
            <div className='relative my-3'>
              <span className='sr-only'>Password</span>
              <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
                {showPassword ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 text-slate-400 cursor-pointer'
                    onClick={() => {
                      setShowPassword(false);
                    }}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 text-slate-400 cursor-pointer'
                    onClick={() => {
                      setShowPassword(true);
                    }}>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                    />
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                    />
                  </svg>
                )}
              </span>
              <input
                autoComplete='off'
                className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
                placeholder='Mật khẩu đăng nhập'
                type={showPassword ? "text" : "password"}
                name='password'
                required
                onChange={handleChangePassword}
                value={userLogin.password}
              />
            </div>
            <button className='btn btn-active btn-primary w-full' type='submit'>
              Đăng nhập
            </button>
          </form>
        </DialogContent>
        {/* <DialogActions className='flex gap-4'>
          <button
            onClick={handleCloseDialogLogin}
            className='uppercase text-red-600 font-semibold	'>
            Không
          </button>
          <button
            onClick={handleSignOut}
            autoFocus
            className='uppercase font-semibold	'>
            Đăng xuất
          </button>
        </DialogActions> */}
      </Dialog>

      {/* Dialog logout */}
      <Dialog
        open={openDialogLogout}
        onClose={handleCloseDialogLogout}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle id='alert-dialog-title' className='text-blue-700'>
          {"Xác nhận đăng xuất"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Bạn có chắc chắn muốn đăng xuất tài khoản!
          </DialogContentText>
        </DialogContent>
        <DialogActions className='flex gap-4'>
          <button
            onClick={handleCloseDialogLogout}
            className='uppercase text-red-600 font-semibold	'>
            Không
          </button>
          <button
            onClick={handleSignOut}
            autoFocus
            className='uppercase font-semibold	'>
            Đăng xuất
          </button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
