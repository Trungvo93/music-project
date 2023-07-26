"use client";
import Image from "next/image";
import styles from "../css/components/SearchBarComp.module.scss";
import { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/context";

import axios from "axios";
import { urlSearch } from "@/api/allApi";
import { CloseIcon, PlayIcon, SearchIcon } from "@/svg/svg";
const SearchBarComp = ({ checkOutside }) => {
  const { dispatch } = useContext(AppContext);
  //Searchbar
  const [searchValue, setSearchValue] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
  };
  const handleClear = () => {
    setSearchValue("");
    setListSearch([]);
  };
  useEffect(() => {
    handleClear();
  }, [checkOutside]);
  // debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      getResultSearch();
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);
  const getResultSearch = async () => {
    try {
      if (searchValue !== "") {
        const res = await axios.get(urlSearch, {
          params: {
            query: searchValue,
            _limit: 30,
            _page: 1,
          },
        });
        setListSearch(res.data.data);
      } else {
        setListSearch([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //Play music
  const handleAddPlaylist = (index) => {
    if (listSearch.length > 0) {
      const list = listSearch.map((item, index1) => {
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
      dispatch({ type: "FIRSTPLAY" });
    }
  };
  return (
    <div>
      <div>
        <span className='sr-only'>Search</span>
        <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
          <SearchIcon className='w-4 h-4' />
        </span>
        <input
          autoComplete='off'
          value={searchValue}
          onChange={handleInputChange}
          className={`placeholder-shown:truncate placeholder:italic placeholder:text-slate-400 block bg-white w-full  py-2 pl-9 pr-3 shadow-sm focus:outline-none sm:text-sm  ${
            listSearch.length > 0
              ? "rounded-t-lg bg-[url('/hinh-o-vuong.png')] border-b"
              : "rounded-full"
          }`}
          placeholder='Nhập tên bài hát, nghệ sĩ hoặc MV'
          type='text'
          name='search'
        />

        <span className='absolute inset-y-0 right-0 flex items-center pr-3 h-[37.6px]'>
          <div onClick={() => handleClear()}>
            <CloseIcon
              className={`w-5 h-5 cursor-pointer ${
                listSearch.length > 0 ? "block" : "hidden"
              }`}
            />
          </div>
        </span>
      </div>
      <div
        className={`absolute w-full p-3 rounded-b-lg bg-white z-50 h-52 ${
          styles.scrollBar
        }	 ${
          listSearch.length > 0 ? "block" : "hidden"
        } bg-[url('/hinh-o-vuong.png')]`}>
        {listSearch.map((item, index) => (
          <div
            key={index}
            className='flex gap-3 items-center p-2 hover:bg-slate-400 rounded '>
            <div className='relative group cursor-pointer'>
              <div className='w-full h-full absolute inset-0 bg-black opacity-30 rounded hidden group-hover:block'></div>
              <Image
                src={item.image_music}
                alt={item.slug_name_music}
                width={40}
                height={40}
                className='object-cover rounded w-auto'
              />
              <div onClick={() => handleAddPlaylist(index)}>
                <PlayIcon className='w-6 h-6 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-white hidden group-hover:block' />
              </div>
            </div>

            <div className=''>
              <p className=' hover:font-medium cursor-pointer'>
                {item.name_music}
              </p>
              <p className='text-xs text-gray-600'>{item.name_singer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchBarComp;
