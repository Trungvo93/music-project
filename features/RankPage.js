"use client";
import { Tabs } from "antd";
import { useState, useEffect } from "react";
import { urlTopViews } from "../api/allApi";
import useSWR from "swr";
import axios from "axios";
import SkeletonRankPageComp from "@/components/SkeletonRankPageComp";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const RankPage = () => {
  const { data: data, error: error } = useSWR(urlTopViews, fetcher);
  const [keyActive, setKeyActive] = useState(1);
  const [topRankViet, setTopRankViet] = useState();
  const [topRankHan, setTopRankHan] = useState();
  const [topRankUSUK, setTopRankUSUK] = useState();
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
          <SkeletonRankPageComp />
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
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: (
        <div className={`${keyActive == 3 ? "text-red-500" : ""} text-xl`}>
          K-POP
        </div>
      ),
      children: `Content of Tab Pane 3`,
    },
  ];
  return (
    <div className='m-3'>
      <Tabs
        defaultActiveKey='1'
        items={items}
        onChange={onChange}
        type='card'
      />
    </div>
  );
};

export default RankPage;
