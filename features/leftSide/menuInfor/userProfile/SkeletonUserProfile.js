"use client";
import { Skeleton } from "antd";
const SkeletonUserProfile = () => {
  return (
    <div className='m-3'>
      <Skeleton
        variant='rectangular'
        className='w-full h-48'
        animation='wave'
      />
      <div className='my-3'>
        <div className='mb-2'>
          <p className='text-blue-500 text-xl font-medium'>PLAYLIST | ALBUM</p>
        </div>
        <div className='grid lg:grid-cols-4 grid-cols-2 gap-4'>
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
        </div>
      </div>

      <div className='my-3'>
        <div className='mb-2'>
          <p className='text-orange-400 text-xl font-medium'>NGHE GẦN ĐÂY</p>
        </div>
        <div className='grid lg:grid-cols-8 grid-cols-4 gap-4'>
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />
          <Skeleton active block={true} />

          {/* <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          />
          <Skeleton
            variant='rectangular'
            className='w-full lg:h-36 md:h-28 h-12'
            animation='wave'
          /> */}
        </div>
      </div>
    </div>
  );
};

export default SkeletonUserProfile;
