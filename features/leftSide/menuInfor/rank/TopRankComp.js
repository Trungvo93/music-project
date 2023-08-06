import Image from "next/image";

const TopRankComp = ({ listRank }) => {
  return (
    <div>
      {listRank
        ? listRank.map((item, index) => (
            <div key={index}>
              <div className='flex items-center gap-4 m-3'>
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
                <Image
                  src={item.image_music}
                  width={60}
                  height={60}
                  alt={item.slug_name_music}
                  className='rounded-md shadow h-auto w-auto'
                />
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
  );
};

export default TopRankComp;
