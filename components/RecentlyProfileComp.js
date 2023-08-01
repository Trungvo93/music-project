"use client";
import { urlGetRecentlySongs } from "@/api/allApi";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/context";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@/svg/svg";
const fetchRecentlySongs = async (urlGetRecentlySongs, accessToken) => {
  if (accessToken) {
    return await axios
      .get(`${urlGetRecentlySongs}?_limit=20`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
      .then((res) => res.data.data);
  } else return;
};
const RecentlyProfileComp = async () => {
  const { state, dispatch } = useContext(AppContext);
  const [accessToken, setAccessToken] = useState();
  // Get accessToken
  useEffect(() => {
    // Perform localStorage action
    const item = localStorage.getItem("accessKey");
    setAccessToken(item);
  }, [state.userLogged]);

  const { data: dataRecentlySongs, error: errorRecentlySongs } = useSWR(
    [urlGetRecentlySongs, accessToken],
    ([url, token]) => fetchRecentlySongs(url, token)
  );

  return (
    <div>
      <div className='mb-2 flex justify-between items-center'>
        <p className='text-blue-500 text-xl font-medium'>NGHE GẦN ĐÂY</p>
        <Link
          href='/recently'
          className='flex text-xs items-center hover:text-red-400'>
          <p>TẤT CẢ</p>
          <ArrowRightIcon className='w-3 h-3' />
        </Link>
      </div>
      <div className='grid grid-cols-4  sm:grid-cols-5 lg:grid-cols-10  justify-center gap-6'>
        {dataRecentlySongs
          ? dataRecentlySongs.map((element, index) => (
              <div key={index} className='flex flex-col justify-between'>
                <Image
                  src={element.music.image_music}
                  alt={element.music.slug_name_music}
                  width={500}
                  height={0}
                  className='object-cover h-full rounded-md shadow'
                />

                <div className='mt-3'>
                  <p className='line-clamp-1'>{element.music.name_music}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default RecentlyProfileComp;
