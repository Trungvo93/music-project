"use client";

import { useContext } from "react";

import useSWR from "swr";
import axios from "axios";
import { urlRemix, urlChill, urlKpop, urlVpop, urlSoSad } from "@/api/allApi";
import { AppContext } from "@/context/context";
import MaybeYouWantComp from "@/features/maybeWantMain/MaybeYouWantComp";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);

const MaybeYouWant = () => {
  const { state, dispatch } = useContext(AppContext);
  const { data: dataRemix, error: errorRemix } = useSWR(urlRemix, fetcher);
  const { data: dataChill, error: errorChill } = useSWR(urlChill, fetcher);
  const { data: dataKpop, error: errorKpop } = useSWR(urlKpop, fetcher);
  const { data: dataVpop, error: errorVpop } = useSWR(urlVpop, fetcher);
  const { data: dataSoSad, error: errorSoSad } = useSWR(urlSoSad, fetcher);

  return (
    <div>
      <div className='px-2 py-3'>
        <div className='py-3'>
          <p className='font-semibold text-lg'>Có Thể Bạn Muốn Nghe</p>
        </div>
        <div className='grid grid-cols-2  sm:grid-cols-4 lg:grid-cols-5  justify-center gap-3 '>
          <MaybeYouWantComp
            playlist={dataRemix}
            srcImage='/assets/maybewant/top-remix.webp'
            altImage='top-remix'
          />
          <MaybeYouWantComp
            playlist={dataChill}
            srcImage='/assets/maybewant/chill.webp'
            altImage='chill'
          />
          <MaybeYouWantComp
            playlist={dataKpop}
            srcImage='/assets/maybewant/kpop.webp'
            altImage='kpop'
          />
          <MaybeYouWantComp
            playlist={dataVpop}
            srcImage='/assets/maybewant/nhac-tre.webp'
            altImage='nhac-tre'
          />
          <div className='hidden lg:block'>
            <MaybeYouWantComp
              playlist={dataSoSad}
              srcImage='/assets/maybewant/nhac-buon.webp'
              altImage='nhac-buon'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaybeYouWant;
