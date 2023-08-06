import MVhotPage from "@/features/leftSide/menuMusic/mvHot/MVhotPage";
import axios from "axios";
import { urlTrending } from "@/api/allApi";
const getData = async () => {
  try {
    const res = await axios.get(urlTrending);
    return res.data.data;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
};
const page = async () => {
  const data = await getData();
  return (
    <div>
      <MVhotPage listTrending={data} />
    </div>
  );
};

export default page;
