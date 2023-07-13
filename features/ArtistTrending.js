"use client";

import useSWR from "swr";
import axios from "axios";
import {
  urlHoQuangHieu,
  urlSonTung,
  urlPhanManhQuynh,
  urlBichPhuong,
  urlTangPhuc,
} from "../api/allApi";
import ArtistTrendingComp from "@/components/ArtistTrendingComp";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const ArtistTrending = () => {
  const { data: dataHoQuangHieu, error: errorHoQuangHieu } = useSWR(
    urlHoQuangHieu,
    fetcher
  );
  const { data: dataSonTung, error: errorSonTung } = useSWR(
    urlSonTung,
    fetcher
  );
  const { data: dataPhanManhQuynh, error: errorPhanManhQuynh } = useSWR(
    urlPhanManhQuynh,
    fetcher
  );
  const { data: dataBichPhuong, error: errorBichPhuong } = useSWR(
    urlBichPhuong,
    fetcher
  );
  const { data: dataTangPhuc, error: errorTangPhuc } = useSWR(
    urlTangPhuc,
    fetcher
  );

  return (
    <div>
      <div className='px-2 py-3'>
        <div className='py-3'>
          <p className='font-semibold text-lg'>Nghệ Sĩ Thịnh Hành</p>
        </div>
        <div className='grid grid-cols-2  sm:grid-cols-4 lg:grid-cols-5  justify-center gap-3 '>
          <ArtistTrendingComp
            playlist={dataHoQuangHieu}
            srcImage='/assets/topartist/ho-quang-hieu.webp'
            altImage='ho-quang-hieu'
            title1='Những bài hát hay nhất của hồ quang hiếu'
            title2='hồ quang hiếu'
          />

          <ArtistTrendingComp
            playlist={dataSonTung}
            srcImage='/assets/topartist/son-tung.webp'
            altImage='son-tung'
            title1='Những bài hát hay nhất của sơn tùng mtp'
            title2='Sơn tùng mtp'
          />

          <ArtistTrendingComp
            playlist={dataPhanManhQuynh}
            srcImage='/assets/topartist/phan-manh-quynh.webp'
            altImage='phan-manh-quynh'
            title1='Những bài hát hay nhất của phan mạnh quỳnh'
            title2='phan mạnh quỳnh'
          />

          <ArtistTrendingComp
            playlist={dataTangPhuc}
            srcImage='/assets/topartist/tang-phuc.webp'
            altImage='tang-phuc'
            title1='Những bài hát hay nhất của tăng phúc'
            title2='tăng phúc'
          />

          <div className='hidden lg:block'>
            <ArtistTrendingComp
              playlist={dataBichPhuong}
              srcImage='/assets/topartist/bich-phuong.webp'
              altImage='bich-phuong'
              title1='Những bài hát hay nhất của bích phương'
              title2='bích phương'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistTrending;
