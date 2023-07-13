import Image from "next/image";
const RadioComp = ({
  srcBackground,
  altBackground,
  srcAvatar,
  altAvatar,
  title,
  listenCount,
}) => {
  console.log(srcBackground);
  return (
    <div>
      <div className='relative ring-offset ring-gray-400 ring-4 rounded-full w-full group cursor-pointer '>
        <div className='overflow-hidden rounded-full group relative'>
          <div className='w-full h-full -z-10 group-hover:z-10 bg-[#000000] opacity-30 absolute inset-0'></div>
          <Image
            src={srcBackground}
            alt={altBackground}
            width={500}
            height={0}
            className=' group-hover:scale-125 duration-700	'
          />
        </div>
        <p className='z-30 absolute bottom-[-5%] left-1/2 -translate-x-1/2 text-white font-semibold text-xs bg-[#ff0000] px-2 py-1 rounded-md'>
          LIVE
        </p>
        <div className='z-30 absolute w-1/4 h-1/4 right-[-5%] top-[60%] ring-offset ring-black ring-1 rounded-full '>
          <Image
            src={srcAvatar}
            alt={altAvatar}
            fill
            sizes='100px'
            className='rounded-full  object-cover w-auto h-auto '
          />
        </div>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='z-30 w-16 h-16 hover:text-yellow-200 absolute  -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 text-white hidden group-hover:block 	'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
          />
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z'
          />
        </svg>
      </div>
      <div className='text-center mt-3'>
        <p className='font-bold'>{title}</p>
        <p className='text-xs text-gray-500'>{listenCount}</p>
      </div>
    </div>
  );
};

export default RadioComp;
