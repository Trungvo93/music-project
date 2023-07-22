"use client";
import useSWR from "swr";
import { useRef, useState, useEffect, useContext } from "react";
import {
  Slider,
  Popover,
  SwipeableDrawer,
  Divider,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
} from "@mui/material";

import { AppContext } from "../context/context";
import styles from "../css/features/AudioTask.module.scss";
import Image from "next/image";
import axios from "axios";
import { urlFavoriteMusic, urlAddFavorite } from "@/api/allApi";
import { HeartSolidIcon, HeartOutlineIcon, MoreInfoIcon } from "@/svg/svg";
import AddPersonalPlaylist from "@/components/AddPersonalPlaylist";
const fetchFavorite = async (url, token) => {
  if (token) {
    return await axios
      .get(url, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => res.data.data);
  } else {
    return;
  }
};
const AudioTask = () => {
  const [currentTrack, setCurrentTrack] = useState();
  const [displayCurrentTime, setDisplayCurrentTime] = useState();
  const { state, dispatch } = useContext(AppContext);
  const [accessToken, setAccessToken] = useState();
  const [favoriteList, setFavoriteList] = useState([]);
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("accessKey");
    setAccessToken(item);
  }, [state.userLogged]);

  const { data: dataFavorite, error: errorFavorite } = useSWR(
    [urlFavoriteMusic, accessToken],
    ([url, token]) => fetchFavorite(url, token)
  );
  useEffect(() => {
    if (dataFavorite) {
      const list = [];
      dataFavorite.forEach((element) => list.push(element.id_music));
      setFavoriteList(list);
    }
  }, [dataFavorite]);
  const audioRef = useRef();
  const [isPause, setIsPause] = useState(true);
  const [isPlay, setPlay] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [isRepeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState();
  const [position, setPosition] = useState(0);
  const [sliderDuration, setSliderDuration] = useState(0);
  const [sliderVolume, setSliderVolume] = useState(30);
  const [anchorElVolume, setAnchorElVolume] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const handleClickVolume = (event) => {
    setAnchorElVolume(event.currentTarget);
  };

  const handleCloseVolume = () => {
    setAnchorElVolume(null);
  };
  const open = Boolean(anchorElVolume);
  const id = open ? "simple-popover" : undefined;
  //Active background item in playlist
  const [activeTrack, setActiveTrack] = useState();

  //add back playlist from locaStorage first time
  useEffect(() => {
    const localPlaylist = localStorage.getItem("playList");
    if (localPlaylist !== null) {
      dispatch({ type: "ADDPLAYLIST", payload: JSON.parse(localPlaylist) });
    }
  }, []);

  useEffect(() => {
    const index = state.playList.findIndex((item) => item.isActive == true);
    setCurrentTrack(state.playList[index]);
    setActiveTrack(index);
    if (index >= 0) {
      localStorage.setItem("activeTrack", true);
      document.getElementsByClassName("sectionMain")[0].style.height =
        "calc(100vh - 90px)";
      document.getElementsByClassName("sectionFooter")[0].style.display =
        "block";
    } else {
      localStorage.setItem("activeTrack", false);
      document.getElementsByClassName("sectionMain")[0].style.height = "100vh";
      document.getElementsByClassName("sectionFooter")[0].style.display =
        "none";
    }
    if (isPlay && isPause) {
      audioRef.current.play();
      setIsPause(false);
    }
  }, [state.playList]);

  useEffect(() => {
    if (favoriteList) {
      const found = favoriteList.find(
        (element) => element === currentTrack._id
      );
      if (found) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    }
  }, [currentTrack, favoriteList]);
  const handleCanPlay = () => {
    setPlay(true);
  };

  const handleLoadedData = () => {
    setSliderDuration(audioRef.current.duration);
    handleSlider();
    const floorTime = Math.floor(audioRef.current.duration);
    let mins = Math.floor(floorTime / 60);
    let secs = Math.floor(floorTime % 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    setDuration(`${mins}:${secs}`);
    if (isPlay || state.firstPlay) {
      audioRef.current.play();
      setIsPause(false);
    }
  };
  const handlePlayAudio = () => {
    audioRef.current.play();
    setIsPause(false);
  };
  const handlePauseAudio = () => {
    audioRef.current.pause();
    setIsPause(true);
  };
  const handlePrevious = () => {
    const index = state.playList.findIndex((item) => item.isActive == true);
    if (isRepeat) {
      audioRef.current.currentTime = 0;
    } else {
      if (isShuffle === false) {
        if (index === 0) {
          setCurrentTrack(state.playList[state.playList.length - 1]);
          state.playList[state.playList.length - 1].isActive = true;
          state.playList[index].isActive = false;
        } else {
          setCurrentTrack(state.playList[index - 1]);
          state.playList[index - 1].isActive = true;
          state.playList[index].isActive = false;
        }
      } else {
        let shuffleIndex;
        do {
          shuffleIndex = Math.floor(Math.random() * state.playList.length);
        } while (shuffleIndex === index);
        setCurrentTrack(state.playList[shuffleIndex]);
        state.playList[shuffleIndex].isActive = true;
        state.playList[index].isActive = false;
      }
    }
    setIsPause(false);

    dispatch({ type: "ADDPLAYLIST", payload: state.playList });
    const tmp = JSON.stringify(state.playList).toString();
    localStorage.setItem("playList", tmp);
  };

  const handleNext = () => {
    const index = state.playList.findIndex((item) => item.isActive == true);
    if (isRepeat) {
      audioRef.current.currentTime = 0;
    } else {
      if (isShuffle === false) {
        if (index === state.playList.length - 1) {
          setCurrentTrack(state.playList[0]);
          state.playList[0].isActive = true;
          state.playList[index].isActive = false;
        } else {
          setCurrentTrack(state.playList[index + 1]);
          state.playList[index + 1].isActive = true;
          state.playList[index].isActive = false;
        }
      } else {
        let shuffleIndex;
        do {
          shuffleIndex = Math.floor(Math.random() * state.playList.length);
        } while (shuffleIndex === index);
        setCurrentTrack(state.playList[shuffleIndex]);
        state.playList[shuffleIndex].isActive = true;
        state.playList[index].isActive = false;
      }
    }
    setIsPause(false);

    dispatch({ type: "ADDPLAYLIST", payload: state.playList });
    const tmp = JSON.stringify(state.playList).toString();
    localStorage.setItem("playList", tmp);
  };

  const handleRepeat = () => {
    if (isRepeat) {
      audioRef.current.loop = false;
      setRepeat(false);
    } else {
      audioRef.current.loop = true;
      setRepeat(true);
    }
  };

  const handleSlider = () => {
    const floorTime = Math.floor(audioRef.current.currentTime);
    if (floorTime != position) {
      setPosition(floorTime);
    }
    let mins = Math.floor(floorTime / 60);
    let secs = Math.floor(floorTime % 60);
    if (mins < 10) {
      mins = "0" + mins;
    }
    if (secs < 10) {
      secs = "0" + secs;
    }
    setDisplayCurrentTime(`${mins}:${secs}`);
  };

  const handleChangeSlider = (event, value) => {
    setPosition(value);
    audioRef.current.currentTime = value;
    handleSlider();
  };

  const handleVolumeChange = (event, value) => {
    setSliderVolume(value);
    audioRef.current.volume = value / 100;
  };

  const handleSuffle = () => {
    if (isShuffle == false) {
      setShuffle(true);
    } else {
      setShuffle(false);
    }
  };

  const [showPlaylist, setShowPlaylist] = useState(false);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setShowPlaylist(open);
  };

  const handlePlayList = (item, index) => {
    setCurrentTrack(item);
    setActiveTrack(index);
    setPlay(true);

    audioRef.current.play();

    const list = state.playList.map((item, index1) => {
      if (index === index1) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    const tmp = JSON.stringify(list).toString();
    localStorage.setItem("playList", tmp);

    dispatch({ type: "ADDPLAYLIST", payload: list });
  };

  const handleAddFavorite = async (idMusic) => {
    const res = await axios.post(
      urlAddFavorite,
      { idMusic: idMusic },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const newListFavorite = [...favoriteList];
    newListFavorite.push(res.data.id_music);
    setFavoriteList(newListFavorite);
  };

  const handleDeleteFavorite = async (idMusic) => {
    const res = await axios.post(
      urlAddFavorite,
      { idMusic: idMusic },
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );
    const index = favoriteList.findIndex((e) => e === res.data.id_music);
    favoriteList.splice(index, 1);
    setFavoriteList([...favoriteList]);
  };

  // Dialog
  const [openDialog, setOpenDialog] = useState(false);
  const [itemAddPersonalPlaylist, setItemAddPersonalPlaylist] = useState();
  const handleClickOpenDialog = (item) => {
    setOpenDialog(true);
    setItemAddPersonalPlaylist(item);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  if (currentTrack)
    return (
      <div className='flex justify-between px-5 audioTask'>
        <audio
          ref={audioRef}
          src={currentTrack ? currentTrack.src_music : ""}
          onTimeUpdate={handleSlider}
          onEnded={() => handleNext()}
          onLoadedData={handleLoadedData}
          onCanPlay={handleCanPlay}
        />
        <div className=' items-center	gap-3 hidden md:flex md:w-1/4'>
          <Image
            src={currentTrack.image_music}
            alt={currentTrack.name_music}
            width={50}
            height={50}
            style={{ width: "50px", height: "50px" }}
            className='rounded-md cursor-pointer'
          />
          <div className='w-full hidden md:block'>
            <p className='font-medium  line-clamp-1'>
              {currentTrack.name_music}
            </p>
            <p className='text-sm	text-slate-700	line-clamp-1'>
              {currentTrack.name_singer}
            </p>
          </div>
        </div>

        <div className='py-2 w-1/2'>
          <div className=' flex items-center gap-4 lg:gap-7 justify-center'>
            {/* shuffle */}
            <svg
              onClick={handleSuffle}
              id='shuffle'
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className={`bi bi-shuffle cursor-pointer w-5 h-5  hover:text-white hover:scale-125 duration-300 ${
                isShuffle ? "text-white" : "text-black"
              }`}
              viewBox='0 0 16 16'>
              <path
                fillRule='evenodd'
                d='M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.624 9.624 0 0 0 7.556 8a9.624 9.624 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.595 10.595 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.624 9.624 0 0 0 6.444 8a9.624 9.624 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5z'
              />
              <path d='M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192zm0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192z' />
            </svg>

            {/* previous */}
            <svg
              onClick={handlePrevious}
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-caret-left-fill cursor-pointer hover:text-white hover:scale-125 duration-300'
              viewBox='0 0 16 16'>
              <path d='m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z' />
            </svg>

            {/* play/pause */}

            <div>
              {isPause ? (
                <svg
                  id='playAudio'
                  onClick={handlePlayAudio}
                  xmlns='http://www.w3.org/2000/svg'
                  width='50'
                  height='50'
                  fill='currentColor'
                  className={`bi bi-play-circle w-8 h-8 sm:w-12 sm:h-12  p-1 cursor-pointer hover:text-white hover:scale-125 duration-300  `}
                  viewBox='0 0 16 16'>
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                  <path d='M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z' />
                </svg>
              ) : (
                <svg
                  id='pauseAudio'
                  onClick={handlePauseAudio}
                  xmlns='http://www.w3.org/2000/svg'
                  width='50'
                  height='50'
                  fill='currentColor'
                  className={`bi bi-pause-circle w-8 h-8 sm:w-12 sm:h-12 p-1 cursor-pointer hover:text-white hover:scale-125 duration-300   `}
                  viewBox='0 0 16 16'>
                  <path d='M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z' />
                  <path d='M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z' />
                </svg>
              )}
            </div>

            {/* next */}
            <svg
              onClick={handleNext}
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='currentColor'
              className='bi bi-caret-right-fill cursor-pointer hover:text-white hover:scale-125 duration-300'
              viewBox='0 0 16 16'>
              <path d='m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z' />
            </svg>

            {/* repeat */}
            <div>
              {isRepeat ? (
                <svg
                  id='repeat'
                  onClick={handleRepeat}
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-repeat-1 cursor-pointer hover:text-white hover:scale-125 duration-300 relative '
                  viewBox='0 0 16 16'>
                  <path d='M11 4v1.466a.25.25 0 0 0 .41.192l2.36-1.966a.25.25 0 0 0 0-.384l-2.36-1.966a.25.25 0 0 0-.41.192V3H5a5 5 0 0 0-4.48 7.223.5.5 0 0 0 .896-.446A4 4 0 0 1 5 4h6Zm4.48 1.777a.5.5 0 0 0-.896.446A4 4 0 0 1 11 12H5.001v-1.466a.25.25 0 0 0-.41-.192l-2.36 1.966a.25.25 0 0 0 0 .384l2.36 1.966a.25.25 0 0 0 .41-.192V13h6a5 5 0 0 0 4.48-7.223Z' />
                  <path d='M9 5.5a.5.5 0 0 0-.854-.354l-1.75 1.75a.5.5 0 1 0 .708.708L8 6.707V10.5a.5.5 0 0 0 1 0v-5Z' />
                </svg>
              ) : (
                <svg
                  id='noneRepeat'
                  onClick={handleRepeat}
                  xmlns='http://www.w3.org/2000/svg'
                  width='20'
                  height='20'
                  fill='currentColor'
                  className='bi bi-repeat cursor-pointer hover:text-white hover:scale-125 duration-300 relative'
                  viewBox='0 0 16 16'>
                  <path d='M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192Zm3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z' />
                </svg>
              )}
            </div>
          </div>

          {/* Slider */}
          <div className='flex items-center gap-3 justify-center w-full'>
            <p className='w-12 shrink-0 text-sm	text-center'>
              {displayCurrentTime}
            </p>
            <Slider
              size='small'
              min={0}
              max={sliderDuration}
              value={position}
              step={0.00000001}
              onChange={handleChangeSlider}
              valueLabelDisplay='off'
              className='w-full'
              sx={{
                color: "#D5CD6E",
                padding: "5px 0px",
              }}
            />
            <p className='w-12 shrink-0 text-sm text-center'>{duration}</p>
          </div>
        </div>
        <div className=' flex items-center gap-4 justify-end w-1/4 '>
          {/* like */}
          {favoriteList.find((e) => e === currentTrack._id) ? (
            // Favorite
            <div onClick={() => handleDeleteFavorite(currentTrack._id)}>
              <HeartSolidIcon
                className={
                  "w-6 h-6 shrink-0  cursor-pointer hover:text-white hover:scale-125 duration-300 text-yellow-400"
                }
              />
            </div>
          ) : (
            // Not favorite
            <div onClick={() => handleAddFavorite(currentTrack._id)}>
              <HeartOutlineIcon
                className={
                  "w-6 h-6 shrink-0  cursor-pointer hover:text-white hover:scale-125 duration-300 "
                }
              />
            </div>
          )}

          {/* volume */}
          <div>
            {/* Icon Volume */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 shrink-0 cursor-pointer hover:text-white hover:scale-125 duration-300'
              aria-describedby={id}
              variant='contained'
              onClick={handleClickVolume}>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
              />
            </svg>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorElVolume}
              onClose={handleCloseVolume}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              transformOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              PaperProps={{
                style: {
                  backgroundColor: "transparent",
                  border: "0",
                  overflow: "hidden",
                  boxShadow: "none",
                },
              }}>
              <Slider
                aria-label='Volume'
                max={100}
                min={0}
                orientation='vertical'
                value={sliderVolume}
                onChange={handleVolumeChange}
                className=''
                sx={{
                  height: "100px",
                  color: "#D5CD6E",
                }}
              />
            </Popover>
          </div>
          <Divider
            orientation='vertical'
            flexItem
            sx={{ margin: "1rem 0rem" }}></Divider>
          <svg
            onClick={() => {
              setShowPlaylist(true);
            }}
            id='iconShowPlaylist'
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='bi bi-music-note-list cursor-pointer hover:text-white hover:scale-125 duration-300 relative shrink-0'
            viewBox='0 0 16 16'>
            <path d='M12 13c0 1.105-1.12 2-2.5 2S7 14.105 7 13s1.12-2 2.5-2 2.5.895 2.5 2z' />
            <path fillRule='evenodd' d='M12 3v10h-1V3h1z' />
            <path d='M11 2.82a1 1 0 0 1 .804-.98l3-.6A1 1 0 0 1 16 2.22V4l-5 1V2.82z' />
            <path
              fillRule='evenodd'
              d='M0 11.5a.5.5 0 0 1 .5-.5H4a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 7H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 .5 3H8a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5z'
            />
          </svg>
          {/* ShowPlaylist */}
          <SwipeableDrawer
            anchor='right'
            open={showPlaylist}
            // 1 trong 2 cách
            PaperProps={{ sx: { backgroundColor: "#1abc9c" } }}
            // sx={{
            //   "& .MuiDrawer-paper": {
            //     backgroundColor: "#1abc9c",
            //   },
            // }}
            onClose={toggleDrawer("right", false)}
            onOpen={toggleDrawer("right", true)}
            transitionDuration={700}>
            {state.playList.map((item, index) => (
              <div
                key={index}
                className={`flex gap-2 p-3 items-center	hover:bg-amber-50/50 bgShowPlaylist group ${
                  activeTrack === index ? "bg-amber-50/75 " : ""
                } `}>
                <div
                  className='relative'
                  onClick={() => {
                    handlePlayList(item, index);
                  }}>
                  <div
                    className='relative '
                    style={{ width: "40px", height: "40px" }}>
                    <div
                      className={`w-full h-full opacity-30  rounded   absolute inset-0 ${
                        activeTrack === index ? "block" : "hidden"
                      }  `}
                      style={{ backgroundColor: "black", zIndex: "1" }}></div>
                    <Image
                      src={item.image_music}
                      alt={item.name_music}
                      sizes='40px'
                      fill
                      className='rounded-md cursor-pointer object-cover'
                    />
                  </div>

                  {/* Play button */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    className={`w-5 h-5 absolute text-white   hidden  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer   ${
                      activeTrack === index
                        ? "group-hover:hidden"
                        : "group-hover:block"
                    } `}>
                    <path d='M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z' />
                  </svg>

                  {/* Pause button */}
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 24 24'
                    fill='currentColor'
                    className={`w-5 h-5 absolute text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer   ${
                      activeTrack === index ? "block" : "hidden"
                    } `}
                    style={{ zIndex: "3" }}>
                    <path
                      fillRule='evenodd'
                      d='M6.75 5.25a.75.75 0 01.75-.75H9a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H7.5a.75.75 0 01-.75-.75V5.25zm7.5 0A.75.75 0 0115 4.5h1.5a.75.75 0 01.75.75v13.5a.75.75 0 01-.75.75H15a.75.75 0 01-.75-.75V5.25z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>

                <div className='w-full'>
                  <p className='font-medium '>{item.name_music}</p>
                  <p className='text-sm	text-slate-700	'>{item.name_singer}</p>
                </div>
                <div className='flex justify-center items-center gap-3 ms-3'>
                  {favoriteList.find((e) => e === item._id) ? (
                    <div onClick={() => handleDeleteFavorite(item._id)}>
                      <HeartSolidIcon className='w-6 h-6 shrink-0  cursor-pointer hover:text-white hover:scale-125 duration-300 text-yellow-400 ' />
                    </div>
                  ) : (
                    <div onClick={() => handleAddFavorite(item._id)}>
                      <HeartOutlineIcon className='w-6 h-6 shrink-0  cursor-pointer hover:text-white hover:scale-125 duration-300 ' />{" "}
                    </div>
                  )}

                  <Tooltip
                    title={
                      <div className='grid gap-y-3 p-2'>

                        {/* Download mp3 file */}
                        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-200'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3'
                            />
                          </svg>
                          <button>Tải xuống</button>
                        </div>

                        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-200'>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              d='M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z'
                            />
                          </svg>
                          <button>Xem MV</button>
                        </div>
                        <div
                          className='flex items-center gap-2 cursor-pointer hover:text-yellow-200'
                          onClick={() => handleClickOpenDialog(item)}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z'
                            />
                          </svg>
                          <button>Thêm vào Playlist</button>
                        </div>
                      </div>
                    }>
                    <div>
                      <MoreInfoIcon className='w-6 h-6 justify-items-end cursor-pointer	' />
                    </div>
                  </Tooltip>

                  <Dialog
                    className=''
                    open={openDialog}
                    onClose={handleCloseDialog}
                    aria-labelledby='alert-dialog-title'
                    aria-describedby='alert-dialog-description'>
                    <DialogTitle className='md:w-[500px] w-auto  text-blue-700 border-b-2 border-stone-100'>
                      <div className='flex justify-between items-center'>
                        <p>Thêm vào Playlist</p>
                        <IconButton
                          onClick={() => {
                            handleCloseDialog();
                          }}>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            fill='none'
                            viewBox='0 0 24 24'
                            strokeWidth={1.5}
                            stroke='currentColor'
                            className='w-6 h-6'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M6 18L18 6M6 6l12 12'
                            />
                          </svg>
                        </IconButton>
                      </div>
                    </DialogTitle>
                    <DialogContent className='mt-3 configScrollbar'>
                      <AddPersonalPlaylist
                        listMusic={itemAddPersonalPlaylist}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </SwipeableDrawer>
        </div>
      </div>
    );
};

export default AudioTask;
