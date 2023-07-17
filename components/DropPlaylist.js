"use client";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import {
  urlCreatePlaylist,
  urlGetPlaylist,
  urlGetAllPlaylist,
  urlDeletePlaylist,
} from "@/api/allApi";
import { AppContext } from "@/context/context";
import Link from "next/link";
const fetchWithToken = (urlGetAllPlaylist, accessToken) => {
  if (accessToken) {
    return axios
      .get(urlGetAllPlaylist, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  } else {
    return;
  }
};
const DropPlaylist = () => {
  const { state, dispatch } = useContext(AppContext);
  const [allUserPlaylist, setAllUserPlaylist] = useState();
  const [accessToken, setAccessToken] = useState();
  const { data: dataUserPlaylist, error: errorUserPlaylist } = useSWR(
    [urlGetAllPlaylist, accessToken],
    ([url, token]) => fetchWithToken(url, token),
    { refreshInterval: 1000 }
  );
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("accessKey");
    setAccessToken(item);
  }, [state.userLogged]);
  // useEffect(() => {
  //   const fetchGetAllPlaylist = async (token) => {
  //     const res = await axios.get(urlGetAllPlaylist, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     setAllUserPlaylist(res.data.data);
  //   };
  //   if (state.userLogged) {
  //     const accessToken = localStorage.getItem("accessKey");

  //     fetchGetAllPlaylist(accessToken);
  //   }
  // }, [state.userLogged,state.isAddUserPlaylist]);

  const handleAddPlaylist = (playlist) => {
    const list = playlist.map((item, index) => {
      if (index === 0) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
      return item;
    });
    const tmp = JSON.stringify(list).toString();
    localStorage.setItem("playList", tmp);
    dispatch({ type: "ADDPLAYLIST", payload: list });
    dispatch({ type: "FIRSTPLAY" });
  };

  const handlePlay = async (idPlaylist) => {
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.get(
      `${urlGetPlaylist}?_id=${idPlaylist}`,

      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const playlist = [];
    res.data.data.array_music.forEach((item) => {
      playlist.push(item.music);
    });
    handleAddPlaylist(playlist);
  };

  const handleDeleteList = async (idPlaylist) => {
    const accessToken = localStorage.getItem("accessKey");
    const res = await axios.delete(`${urlDeletePlaylist}?_id=${idPlaylist}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
  };
  return (
    <div>
      {dataUserPlaylist
        ? dataUserPlaylist.map((item, index) => (
            <div
              key={index}
              className='flex justify-between items-center hover:bg-slate-600/50 hover:text-white p-2 rounded-md'>
              <Link href='#' className='hover:text-yellow-400'>
                {item.name_list}
              </Link>
              <div className='flex flex-nowrap gap-2'>
                {/* Action playlist */}
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='w-5 h-5 hover:text-yellow-400 cursor-pointer shrink-0'
                  onClick={() => {
                    handlePlay(item._id);
                  }}>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z'
                  />
                </svg>

                {/* Action delete playlist */}
                <button
                  className=''
                  onClick={() => {
                    const id = "deletePlaylist" + index;
                    document.getElementById(id).showModal();
                  }}>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-5 h-5 cursor-pointer hover:text-yellow-400 shrink-0'
                    // onClick={() => {
                    //   handleDeleteList(item._id);
                    // }}
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0'
                    />
                  </svg>
                </button>
                <dialog id={`deletePlaylist${index}`} className='modal'>
                  <form method='dialog' className='modal-box'>
                    <h3 className='font-bold text-lg'>Xác nhận</h3>
                    <p className='py-4'>
                      Bạn có chắc muốn xóa playlist này
                      {index}
                    </p>
                    <div className='flex justify-end gap-3'>
                      <button
                        className='btn btn-info btn-outline'
                        onClick={() => {
                          const id = "deletePlaylist" + index;
                          document.getElementById(id).close();
                        }}>
                        Không
                      </button>

                      <button
                        className='btn btn-error btn-outline'
                        onClick={() => handleDeleteList(item._id)}>
                        Có
                      </button>
                    </div>
                  </form>
                  <form method='dialog' className='modal-backdrop'>
                    <button>close</button>
                  </form>
                </dialog>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
};

export default DropPlaylist;
