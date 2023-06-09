"use client";
import { useRef, useState, useEffect, useContext } from "react";
import { Slider, SwipeableDrawer, Divider } from "@mui/material";
import { AppContext } from "../context/context";
import styles from "../css/features/AudioTask.module.scss";
import Image from "next/image";
const AudioTask = () => {
  const [currentTrack, setCurrentTrack] = useState();
  const [displayCurrentTime, setDisplayCurrentTime] = useState();
  const { state, dispatch } = useContext(AppContext);

  const audioRef = useRef();
  const [isPause, setIsPause] = useState(true);
  const [isPlay, setPlay] = useState(false);
  const [isShuffle, setShuffle] = useState(false);
  const [isRepeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState();
  const [position, setPosition] = useState(0);
  const [sliderDuration, setSliderDuration] = useState(0);
  const [sliderVolume, setSliderVolume] = useState(30);
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
              className={`bi bi-shuffle cursor-pointer  hover:text-white hover:scale-125 duration-300 ${
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
                  className={`bi bi-play-circle p-1 cursor-pointer hover:text-white hover:scale-125 duration-300  `}
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
                  className={`bi bi-pause-circle p-1 cursor-pointer hover:text-white hover:scale-125 duration-300   `}
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
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-6 h-6 shrink-0'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z'
            />
          </svg>

          {/* volume */}
          <div className='flex flex-nowrap w-1/4 gap-3 items-center relative group'>
            {/* Icon Volume */}
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='w-6 h-6 shrink-0'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z'
              />
            </svg>

            <Slider
              aria-label='Volume'
              max={100}
              min={0}
              size='small'
              value={sliderVolume}
              onChange={handleVolumeChange}
              className='w-12 lg:w-[100px]  text-[#D5CD6E]'
            />
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
                  <p className='font-medium'>{item.name_music}</p>
                  <p className='text-sm	text-slate-700	'>{item.name_singer}</p>
                </div>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-6 h-6 justify-items-end cursor-pointer	'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z'
                  />
                </svg>
              </div>
            ))}
          </SwipeableDrawer>
        </div>
      </div>
    );
};

export default AudioTask;
