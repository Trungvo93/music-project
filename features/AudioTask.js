"use client";
import useSWR from "swr";
import { useRef, useState, useEffect, useContext } from "react";

import { AppContext } from "../context/context";
import styles from "../css/features/AudioTask.module.scss";
import Image from "next/image";
import axios from "axios";
import { urlFavoriteMusic, urlAddFavorite } from "@/api/allApi";

//Ant Design
import {
  Slider,
  Popover,
  Divider,
  Drawer,
  Space,
  Dropdown,
  Modal,
  Button,
} from "antd";

//SVG icon
import {
  HeartSolidIcon,
  HeartOutlineIcon,
  MoreInfoIcon,
  ShuffleIcon,
  PreviosIcon,
  PlayIcon,
  PauseIcon,
  NextIcon,
  RepeatIcon,
  RepeatedIcon,
  VolumeIcon,
  ShowListIcon,
  DownloadIcon,
  MVIcon,
  DetailIcon,
  CloseIcon,
} from "@/svg/svg";
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
  const [itemFocusListMusicPlaying, setItemFocusListMusicPlaying] = useState();
  const items = [
    {
      label: (
        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium'>
          <DownloadIcon className='w-6 h-6' />
          <button>Tải xuống</button>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <div className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium'>
          <MVIcon className='w-6 h-6' />
          <button>Xem MV</button>
        </div>
      ),
      key: "1",
    },
    {
      type: "divider",
    },
    {
      label: (
        <div
          className='flex items-center gap-2 cursor-pointer hover:text-yellow-400 hover:font-medium '
          onClick={() => {
            if (state.personPlaylist) {
              handleClickOpenDialog(itemFocusListMusicPlaying);
            }
          }}>
          <DetailIcon className='w-6 h-6' />
          <button className='whitespace-nowrap'>Thêm vào Playlist</button>
        </div>
      ),
      key: "3",
    },
  ];

  const [currentTrack, setCurrentTrack] = useState();
  const [displayCurrentTime, setDisplayCurrentTime] = useState();
  const { state, dispatch } = useContext(AppContext);

  //Get Favorite list
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
  const [isPlay, setPlay] = useState();
  const [isShuffle, setShuffle] = useState(false);
  const [isRepeat, setRepeat] = useState(false);
  const [duration, setDuration] = useState();
  const [position, setPosition] = useState(0);
  const [sliderDuration, setSliderDuration] = useState(0);
  const [sliderVolume, setSliderVolume] = useState(30);
  const [openVolume, setOpenVolume] = useState(false);
  const handleClickVolume = (newOpen) => {
    setOpenVolume(newOpen);
  };

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
    if (isPlay) {
      handlePlayAudio();
    }
  }, [state.playList]);

  useEffect(() => {
    if (isPlay === false) {
      handlePlayAudio();
    }
  }, [currentTrack]);
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
    audioRef.current.currentTime = 0;
    if (isPlay || state.firstPlay) {
      handlePlayAudio();
    }
  };
  const handlePlayAudio = () => {
    setIsPause(false);
    setPlay(true);
    audioRef.current.play();
  };
  const handlePauseAudio = () => {
    setIsPause(true);
    setPlay(false);
    audioRef.current.pause();
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
    handlePlayAudio();

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

    dispatch({ type: "ADDPLAYLIST", payload: state.playList });
    const tmp = JSON.stringify(state.playList).toString();
    localStorage.setItem("playList", tmp);
    handlePlayAudio();
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

  const handleChangeSlider = (value) => {
    setPosition(value);
    audioRef.current.currentTime = value;
    handleSlider();
  };

  const handleVolumeChange = (value) => {
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

  const handleCloseShowList = () => {
    setShowPlaylist(false);
  };

  const handlePlayList = (item, index) => {
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
    setCurrentTrack(item);
    setActiveTrack(index);
    handlePlayAudio();
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
          autoPlay
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
            <div onClick={() => handleSuffle()}>
              <ShuffleIcon
                className={`bi bi-shuffle cursor-pointer w-5 h-5  hover:text-white hover:scale-125 duration-300 ${
                  isShuffle ? "text-white" : "text-black"
                }`}
              />
            </div>

            {/* previous */}
            <div onClick={() => handlePrevious()}>
              <PreviosIcon className='bi bi-caret-left-fill cursor-pointer hover:text-white hover:scale-125 duration-300' />
            </div>

            {/* play/pause */}
            <div>
              {isPause ? (
                <div onClick={() => handlePlayAudio()}>
                  <PlayIcon
                    className={`bi bi-play-circle w-8 h-8 sm:w-12 sm:h-12  p-1 cursor-pointer hover:text-white hover:scale-125 duration-300  `}
                  />
                </div>
              ) : (
                <div onClick={() => handlePauseAudio()}>
                  <PauseIcon
                    className={`bi bi-pause-circle w-8 h-8 sm:w-12 sm:h-12 p-1 cursor-pointer hover:text-white hover:scale-125 duration-300   `}
                  />
                </div>
              )}
            </div>

            {/* next */}
            <div onClick={() => handleNext()}>
              <NextIcon className='bi bi-caret-right-fill cursor-pointer hover:text-white hover:scale-125 duration-300' />
            </div>

            {/* repeat */}
            <div>
              {isRepeat ? (
                <div onClick={() => handleRepeat()}>
                  <RepeatIcon className='bi bi-repeat-1 cursor-pointer hover:text-white hover:scale-125 duration-300 relative ' />
                </div>
              ) : (
                <div onClick={handleRepeat}>
                  <RepeatedIcon className='bi bi-repeat cursor-pointer hover:text-white hover:scale-125 duration-300 relative' />
                </div>
              )}
            </div>
          </div>

          {/* Slider */}
          <div className='flex items-center gap-3 justify-center w-full'>
            <p className='w-12 shrink-0 text-sm	text-center'>
              {displayCurrentTime}
            </p>
            {/* <Slider
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
            /> */}
            <Slider
              tooltip={{
                open: false,
              }}
              min={0}
              max={sliderDuration}
              value={position}
              onChange={handleChangeSlider}
              className='w-full '
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
            <Popover
              content={
                <Slider
                  vertical
                  min={0}
                  max={100}
                  value={sliderVolume}
                  onChange={handleVolumeChange}
                  className='w-full h-[100px]'
                />
              }
              trigger='click'
              open={openVolume}
              onOpenChange={handleClickVolume}>
              <div>
                <VolumeIcon className='w-6 h-6 shrink-0 cursor-pointer hover:text-white hover:scale-125 duration-300' />
              </div>
            </Popover>
          </div>

          <Divider type='vertical' className='h-1/2 -mx-1 ' />
          <div
            onClick={() => {
              setShowPlaylist(true);
            }}>
            <ShowListIcon className='bi bi-music-note-list cursor-pointer hover:text-white hover:scale-125 duration-300 relative shrink-0' />
          </div>

          {/* ShowPlaylist */}

          <Drawer
            headerStyle={{ backgroundColor: "#d5cd6e" }}
            bodyStyle={{ backgroundColor: "#1abc9c", padding: "0px" }}
            closable={false}
            title={<div>LIST MUSIC PLAYING</div>}
            placement='right'
            onClose={handleCloseShowList}
            open={showPlaylist}>
            {state.playList.map((item, index) => (
              <div
                key={index}
                className={`flex gap-2 p-3 items-center	hover:bg-amber-50/50 bgShowPlaylist group ${
                  activeTrack === index ? "bg-amber-50/75 " : ""
                } `}>
                <div className='relative'>
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
                  <div
                    onClick={() => {
                      handlePlayList(item, index);
                    }}>
                    <PlayIcon
                      className={`w-5 h-5 absolute text-white   z-30   top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer      
                    ${
                      activeTrack === index && isPause
                        ? "block z-30 "
                        : "hidden "
                    }
                    ${activeTrack !== index ? "group-hover:block" : ""}

                    `}
                    />
                  </div>
                  {/* Pause button */}
                  <div onClick={() => handlePauseAudio()}>
                    <PauseIcon
                      className={`w-5 h-5 absolute text-white  top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer   ${
                        activeTrack === index && isPause === false
                          ? "block z-30"
                          : "hidden "
                      }
                     `}
                    />
                  </div>
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

                  <Dropdown
                    menu={{
                      items,
                    }}
                    placement='bottom'
                    arrow={true}
                    trigger={["click"]}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setItemFocusListMusicPlaying(item);
                      }}>
                      <Space>
                        <MoreInfoIcon className='w-6 h-6 cursor-pointer hover:text-yellow-200' />
                      </Space>
                    </a>
                  </Dropdown>

                  <Modal
                    closeIcon={null}
                    mask={false}
                    footer={null}
                    title={
                      <div className='flex justify-between items-center text-blue-700 border-b-2 border-stone-100 pb-2'>
                        <p>Thêm vào Playlist</p>
                        <Button
                          className='flex justify-center items-center'
                          type='text'
                          shape='circle'
                          onClick={() => {
                            handleCloseDialog();
                          }}
                          icon={<CloseIcon className='w-5 h-5' />}></Button>
                      </div>
                    }
                    open={openDialog}
                    onCancel={handleCloseDialog}>
                    <AddPersonalPlaylist listMusic={itemAddPersonalPlaylist} />
                  </Modal>
                </div>
              </div>
            ))}
          </Drawer>
        </div>
      </div>
    );
};

export default AudioTask;
