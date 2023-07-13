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
const [userLogin,setUserLogin] = useState({username:'',password:'',})
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
        <DialogTitle id='alert-dialog-title' className='text-blue-700'>
          {"Đăng nhập"}
        </DialogTitle>
        <DialogContent>
          <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
              placeholder: "Tên đăng nhập",
            }}
            variant='outlined'
          />
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
