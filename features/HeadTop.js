"use client";
// import { Tooltip } from "@mui/material";
import { Tooltip } from "antd";
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
import { GemIcon, UploadIcon } from "@/svg/svg";
const HeadTop = () => {
  const handleLoginGoogle = () => {
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

  const handleSignOutGoogle = () => {
    signOut(auth).then((result) => {
      setUserLogged(undefined);
      setOpenDialog(false);
    });
  };

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
      <div className={`lg:relative  `} id='searchBar'>
        <div
          className={`flex p-5 topBar justify-between content-center  ${
            windowWidth ? `fixed left-[${positionLeft}px]` : ""
          }   z-50 `}
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
          <div className='flex justify-between items-center gap-2	sm:gap-4 ms-2'>
            <Tooltip title='Nâng cấp VIP' arrow placement='bottom'>
              <div className='p-2 sm:p-3 bg-slate-500/30 rounded-full relative cursor-pointer hover:brightness-95	'>
                <GemIcon className='bi bi-gem h-4 w-4' />
              </div>
            </Tooltip>

            <Tooltip title='Tải nhạc lên' arrow placement='bottom'>
              <div className='p-2 sm:p-3 bg-slate-500/30 rounded-full cursor-pointer	hover:brightness-95'>
                <UploadIcon className='bi bi-cloud-arrow-up w-4 h-4' />
              </div>
            </Tooltip>

            {/* Login */}
            <Login />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeadTop;
