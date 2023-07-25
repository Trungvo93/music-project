"use client";
import useSWR from "swr";
import axios from "axios";
import { useEffect, useState } from "react";
import { urlTopViews } from "../api/allApi";
import RankComp from "../components/RankComp";
const fetcher = (url) => axios.get(url).then((res) => res.data.data);
const Rank = () => {
  const { data: data, error: error } = useSWR(urlTopViews, fetcher);
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
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-2 py-3'>
      <RankComp
        srcBanner={`/assets/rank/rank-vietnam.jpg`}
        altBanner={`rank-vietnam`}
        listData={topRankViet}
      />
      <RankComp
        srcBanner={`/assets/rank/rank-usuk.jpg`}
        altBanner={`rank-au-my`}
        listData={topRankUSUK}
      />

      <RankComp
        srcBanner={`/assets/rank/rank-k-pop.jpg`}
        altBanner={`rank-han`}
        listData={topRankHan}
      />
    </div>
  );
};

export default Rank;
