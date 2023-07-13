"use client";
import useSWR from "swr";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "../css/features/SlideBanner.module.scss";
import "../css/features/SlideBanner.css";
import {
  urlTrending,
  urlHitSong,
  urlNewMusic,
  urlPopViet,
} from "../api/allApi";
import axios from "axios";
import SlideBannerComp from "@/components/SlideBannerComp";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const SlideBanner = () => {
  let settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const { data: dataTrending, error: errorTrending } = useSWR(
    urlTrending,
    fetcher
  );
  const { data: dataHitSong, error: errorHitSong } = useSWR(
    urlHitSong,
    fetcher
  );
  const { data: dataNewMusic, error: errorNewMusic } = useSWR(
    urlNewMusic,
    fetcher
  );
  const { data: dataPopViet, error: errorPopViet } = useSWR(
    urlPopViet,
    fetcher
  );

  return (
    <div>
      <Slider {...settings}>
        <SlideBannerComp
          dataList={dataTrending}
          srcBanner={`/assets/banner/nha-nha-nghe-gi.jpg`}
          altBanner={`nha-nha-nghe-gi`}
        />

        <SlideBannerComp
          dataList={dataHitSong}
          srcBanner={`/assets/banner/hit-quoc-dan.jpg`}
          altBanner={`hit-quoc-dan`}
        />

        <SlideBannerComp
          dataList={dataNewMusic}
          srcBanner={`/assets/banner/nhac-moi-moi-tuan.jpg`}
          altBanner={`nhac-moi-moi-tuan`}
        />

        <SlideBannerComp
          dataList={dataPopViet}
          srcBanner={`/assets/banner/ballad.jpg`}
          altBanner={`ballad`}
        />
      </Slider>
    </div>
  );
};

export default SlideBanner;
