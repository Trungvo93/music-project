import { PlayIcon } from "@/svg/svg";
import Image from "next/image";
import { useContext } from "react";
import { AppContext } from "@/context/context";

const RankComp = ({ srcBanner, altBanner, listData }) => {
  const { state, dispatch } = useContext(AppContext);
  const handleAddPlaylist = () => {
    if (listData) {
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
    <div>
      <div>
        {/* Banner */}
        <div className='w-full  my-3 rounded-md overflow-hidden group relative '>
          <div className='-z-10 w-full h-full bg-[#000000] opacity-30 group-hover:z-10 absolute inset-0'></div>
          <Image
            src={srcBanner}
            alt={altBanner}
            width={2000}
            height={1000}
            className='w-full h-full object-cover group-hover:scale-125 duration-500'
          />
          <div className='cursor-pointer' onClick={() => handleAddPlaylist()}>
            <PlayIcon className='w-6 h-6 md:w-10 md:h-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white hidden group-hover:block hover:text-yellow-400 z-30' />
          </div>
        </div>
        <div>
          {listData
            ? listData.map((item, index) => (
                <div key={index}>
                  <div className='flex items-center gap-2 m-3'>
                    <div className='flex-none w-10 h-10 flex items-center justify-center'>
                      <p
                        className={`text-xl font-semibold ${
                          index === 0 ? "text-[#FF0000]" : ""
                        } ${index === 1 ? "text-[#216666]" : ""} ${
                          index === 2 ? "text-[#ffa500]" : ""
                        }`}>
                        {index + 1}
                      </p>
                    </div>
                    <div className='w-full '>
                      <p className='line-clamp-1 font-medium capitalize'>
                        {item.name_music}
                      </p>
                      <p className='line-clamp-1 text-xs text-gray-500 capitalize'>
                        {item.name_singer}
                      </p>
                    </div>
                  </div>
                  <div className='divider my-0 ms-14'></div>
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default RankComp;
