import { urlNewMusic } from "@/api/allApi";
import axios from "axios";
import NewMusicPageComp from "@/features/leftSide/menuMusic/newMusic/NewMusicPageComp";
const getData = async () => {
  try {
    const res = await axios.get(urlNewMusic);
    return res.data.data;
  } catch (error) {
    console.log(error);
  }
};
const page = async () => {
  const data = await getData();
  return (
    <div>
      <NewMusicPageComp listMusic={data} />
    </div>
  );
};

export default page;
