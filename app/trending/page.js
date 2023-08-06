import { urlTrending } from "@/api/allApi";
import axios from "axios";
import TrendingMusicPageComp from "@/features/leftSide/menuMusic/trending/TrendingMusicPageComp";
const getData = async () => {
  try {
    const res = await axios.get(urlTrending);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
const page = async () => {
  const data = await getData();

  return (
    <div>
      <TrendingMusicPageComp listMusic={data} />
    </div>
  );
};

export default page;
