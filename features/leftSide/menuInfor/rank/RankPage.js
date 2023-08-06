"use client";
import { Tabs } from "antd";
import { useState, useEffect, useContext } from "react";
import { urlTopViews } from "@/api/allApi";
import useSWR from "swr";
import axios from "axios";
import SkeletonRankPageComp from "@/features/leftSide/menuInfor/rank/SkeletonRankPageComp";
import TopRankComp from "@/features/leftSide/menuInfor/rank/TopRankComp";
import { PlayIcon } from "@/svg/svg";
import { AppContext } from "@/context/context";

const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const RankPage = () => {
  const { data: data, error: error } = useSWR(urlTopViews, fetcher);
  const [keyActive, setKeyActive] = useState(1);
  const [topRankViet, setTopRankViet] = useState();
  const [topRankHan, setTopRankHan] = useState();
  const [topRankUSUK, setTopRankUSUK] = useState();
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    if (data) {
      const listViet = [];
      const listHan = [];
      const listUSUK = [];
      data.forEach((item) => {
        if (
          item.slug_category.includes("nhac-tre") ||
          item.slug_category.includes("nhac-buoc") ||
          item.slug_category.includes("v-pop") ||
          item.slug_category.includes("rap-viet") ||
          item.slug_category.includes("nhac-chill")
        ) {
          listViet.push(item);
        } else if (item.slug_category.includes("nhac-han")) {
          listHan.push(item);
        } else if (
          item.slug_category.includes("au-my") ||
          item.slug_category.includes("nhac-nuoc-ngoai")
        ) {
          listUSUK.push(item);
        }
      });
      setTopRankViet(listViet.slice(0, 10));
      setTopRankHan(listHan.slice(0, 10));
      setTopRankUSUK(listUSUK.slice(0, 10));
    }
  }, [data]);
  const onChange = (key) => {
    setKeyActive(key);
  };
  const items = [
    {
      key: "1",
      label: (
        <div className={`${keyActive == 1 ? "text-blue-600" : ""} text-xl`}>
          VIỆT NAM
        </div>
      ),
      children: (
        <div>
          {topRankViet ? (
            <TopRankComp listRank={topRankViet} />
          ) : (
            <SkeletonRankPageComp />
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className={`${keyActive == 2 ? "text-green-600" : ""} text-xl`}>
          US-UK
        </div>
      ),
      children: (
        <div>
          {topRankUSUK ? (
            <TopRankComp listRank={topRankUSUK} />
          ) : (
            <SkeletonRankPageComp />
          )}
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className={`${keyActive == 3 ? "text-red-500" : ""} text-xl`}>
          K-POP
        </div>
      ),
      children: (
        <div>
          {topRankHan ? (
            <TopRankComp listRank={topRankHan} />
          ) : (
            <SkeletonRankPageComp />
          )}
        </div>
      ),
    },
  ];

  const handleAddPlaylist = () => {
    if (data) {
      let listData = [];
      if (keyActive == 1) {
        listData = [...topRankViet];
      } else if (keyActive == 2) {
        listData = [...topRankUSUK];
      } else if (keyActive == 3) {
        listData = [...topRankHan];
      }
      const list = listData.map((item, index) => {
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
    }
  };
  return (
    <div className='m-3'>
      <div className='my-5 flex items-center gap-3'>
        <p className='text-2xl font-semibold'>Bảng Xếp Hạng</p>
        <div
          onClick={() => {
            handleAddPlaylist();
          }}>
          <PlayIcon className='w-8 h-8 hover:text-orange-400 cursor-pointer' />
        </div>
      </div>
      <Tabs defaultActiveKey='1' items={items} onChange={onChange} />
    </div>
  );
};

export default RankPage;
