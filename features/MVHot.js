import Link from "next/link";
const MVHot = () => {
  return (
    <div className='px-2 py-3'>
      <div className='py-3 flex justify-between'>
        <p className='font-semibold text-lg'>MV HOT</p>
        <Link
          href='/mvhot'
          className='flex text-xs items-center hover:text-red-400'>
          <p>TẤT CẢ</p>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='w-3 h-3'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M8.25 4.5l7.5 7.5-7.5 7.5'
            />
          </svg>
        </Link>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='w-full h-full'>
          <iframe
            className='w-full aspect-video'
            src='https://www.youtube.com/embed/1YuOQnZm1no'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        </div>
        <div>
          <iframe
            className='w-full aspect-video'
            src='https://www.youtube.com/embed/gJHSDZfJrRY'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        </div>
        <div>
          <iframe
            className='w-full aspect-video'
            src='https://www.youtube.com/embed/7CymvjGuY5k'
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen></iframe>
        </div>
      </div>
    </div>
  );
};

export default MVHot;
