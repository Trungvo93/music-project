import RadioComp from "@/features/radioMain/RadioComp";
import Link from "next/link";
import { ArrowRightIcon } from "@/svg/svg";
const Radio = () => {
  return (
    <div className='px-2 py-3'>
      <div className='py-3 flex justify-between'>
        <p className='font-semibold text-lg'>Radio</p>
        <Link
          href='/radio'
          className='flex text-xs items-center hover:text-red-400'>
          <p>TẤT CẢ</p>
          <ArrowRightIcon className='w-3 h-3' />
        </Link>
      </div>
      <div className='grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-7 gap-10 px-2 py-3'>
        <RadioComp
          srcBackground='/assets/radio/xe-xone.webp'
          altBackground='xe-xone'
          srcAvatar='/assets/radio/avatar/ava-xone.webp'
          altAvatar='ava-xone'
          title='XONE Radio'
          listenCount='614 đang nghe'
        />

        <RadioComp
          srcBackground='/assets/radio/G-dragon.webp'
          altBackground='g-dragon'
          srcAvatar='/assets/radio/avatar/ava-gdragon.webp'
          altAvatar='ava-gdragon'
          title='G-Dragon'
          listenCount='213 đang nghe'
        />

        <RadioComp
          srcBackground='/assets/radio/radio-vpop.webp'
          altBackground='radio-vpop'
          srcAvatar='/assets/radio/avatar/ava-radio-vpop.webp'
          altAvatar='ava-radio-vpop'
          title='V-POP'
          listenCount='759 đang nghe'
        />

        <div className='hidden sm:block'>
          <RadioComp
            srcBackground='/assets/radio/radio-on-air.webp'
            altBackground='radio-on-air'
            srcAvatar='/assets/radio/avatar/ava-radio-on-air.webp'
            altAvatar='ava-radio-on-air'
            title='On Air'
            listenCount='158 đang nghe'
          />
        </div>

        <div className='hidden sm:block'>
          <RadioComp
            srcBackground='/assets/radio/radio-bolero.webp'
            altBackground='radio-bolero'
            srcAvatar='/assets/radio/avatar/ava-radio-bolero.webp'
            altAvatar='ava-radio-bolero'
            title='Bolero'
            listenCount='789 đang nghe'
          />
        </div>
        <div className='hidden lg:block'>
          <RadioComp
            srcBackground='/assets/radio/radio-cham.webp'
            altBackground='radio-cham'
            srcAvatar='/assets/radio/avatar/ava-radio-cham.webp'
            altAvatar='ava-radio-cham'
            title='Chạm'
            listenCount='359 đang nghe'
          />
        </div>

        <div className='hidden lg:block'>
          <RadioComp
            srcBackground='/assets/radio/radio-usuk.webp'
            altBackground='radio-usuk'
            srcAvatar='/assets/radio/avatar/ava-radio-usuk.webp'
            altAvatar='ava-radio-usuk'
            title='US-UK'
            listenCount='209 đang nghe'
          />
        </div>
      </div>
    </div>
  );
};

export default Radio;
