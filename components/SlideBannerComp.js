import { AppContext } from "../context/context";
import { useContext } from "react";
import Image from "next/image";
import { PlayIcon } from "@/svg/svg";
const SlideBannerComp = ({ dataList, srcBanner, altBanner }) => {
  const { state, dispatch } = useContext(AppContext);

  const handleAddPlaylist = () => {
    if (dataList) {
      const list = dataList.map((item, index) => {
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
    <div>
      <div className='  relative  overflow-hidden cursor-pointer	rounded-lg drop-shadow-md group'>
        <div className='w-full h-full bg-black opacity-30 -z-10 group-hover:z-30 absolute inset-0'></div>
        <Image
          priority={true}
          src={srcBanner}
          alt={altBanner}
          height={0}
          width={1000}
          className='duration-1000 object-cover w-full h-auto'
        />
        <div className='absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 hidden z-30 text-white gap-8 justify-center items-center group-hover:block '>
          <div onClick={() => handleAddPlaylist()}>
            <PlayIcon className='w-16 h-16 hover:text-yellow-200	' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideBannerComp;
