import Image from "next/image";
const Partner = () => {
  return (
    <div className='px-2 py-3'>
      <div className=''>
        <p className='text-center font-semibold my-3 text-xl'>
          ĐỐI TÁC ÂM NHẠC
        </p>
      </div>
      <div className='flex flex-row flex-wrap gap-6 justify-center items-center'>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-orcahrd.png`}
            alt={`orcahrd`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-SM-Entertainment.png`}
            alt={`SM-Entertainment`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-FUGA.png`}
            alt={`FUGA`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-universal-1.png`}
            alt={`universal`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-yg.png`}
            alt={`yg`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-empire.png`}
            alt={`empire`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-Kakao-M.png`}
            alt={`Kakao-M`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-beggers.png`}
            alt={`beggers`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-monstercat.png`}
            alt={`monstercat`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
        <div className='basis-[14.2857143%] p-3 drop-shadow flex justify-center '>
          <Image
            src={`/assets/partner/p-sony.png`}
            alt={`sony`}
            width={300}
            height={300}
            className='object-cover w-[100px] '
          />
        </div>
      </div>
    </div>
  );
};

export default Partner;
