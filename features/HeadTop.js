"use client";
import Image from "next/image";
import { Tooltip } from "@mui/material";
import {
  useState,
  useEffect,
  useContext,
  useRef,
  useLayoutEffect,
} from "react";
import { AppContext } from "../context/context";
import { auth, provider } from "../firebase/firebaseConfig";
import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import SearchBarComp from "@/components/SearchBarComp";
import Login from "@/components/Login";
const HeadTop = () => {
  const [userLogged, setUserLogged] = useState();
  const [openDialog, setOpenDialog] = useState(false);
  const { dispatch } = useContext(AppContext);

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
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
      setOpenDialog(false);
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

  // Get the Window’s Width on Resize
  const [widthHeader, setWithHeader] = useState();
  const [windowWidth, setWindowWidth] = useState();
  const [positionLeft, setPositionLeft] = useState();
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  });
  useEffect(() => {
    let width = document.getElementById(`searchBar`).offsetWidth;
    let position = windowWidth - width;
    setWithHeader(width);
    setPositionLeft(position);
  }, [windowWidth]);

  //Check click outside of search
  const [clearSearch, setClearSearch] = useState(false);
  const wrapperRef = useRef(null);
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setClearSearch(true);
      } else {
        setClearSearch(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <div className={`w-full ${windowWidth ? "pb-[80px]" : ""}`}>
      <div className={`relative  `} id='searchBar'>
        <div
          className={`flex p-5 topBar justify-between content-center  ${
            windowWidth ? `fixed left-[${positionLeft}px]` : ""
          }   z-50 `}
          // style={{ width: widthHeader + "px" }}
          style={
            windowWidth ? { width: widthHeader + "px" } : { width: "100%" }
          }>
          {/* Searchbar */}
          <label
            className='relative block flex-initial w-1/2 '
            ref={wrapperRef}>
            <SearchBarComp checkOutside={clearSearch} />
          </label>

          {/* Right element */}
          <div className='flex justify-between items-center	gap-4'>
            <Tooltip title='Nâng cấp VIP' arrow>
              <div className='p-3 bg-slate-500/30 rounded-full relative cursor-pointer hover:brightness-95	'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-gem h-4 w-4'
                  viewBox='0 0 16 16'>
                  <path d='M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z' />
                </svg>
              </div>
            </Tooltip>

            <Tooltip title='Tải nhạc lên' arrow>
              <div className='p-3 bg-slate-500/30 rounded-full cursor-pointer	hover:brightness-95'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-cloud-arrow-up w-4 h-4'
                  viewBox='0 0 16 16'>
                  <path
                    fillRule='evenodd'
                    d='M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708l2-2z'
                  />
                  <path d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z' />
                </svg>
              </div>
            </Tooltip>
            {/* {userLogged ? (
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

                  <button onClick={handleClickOpenDialog}>Đăng xuất</button>
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
              onClick={handleLogin}>
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
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
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
                onClick={handleCloseDialog}
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
          </Dialog> */}

            {/* Login */}
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadTop;
