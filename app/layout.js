import "./globals.css";
import { AppContextProvider } from "../context/context";
import { Work_Sans } from "next/font/google";
import Image from "next/image";
import MenuInfor from "@/features/leftSide/menuInfor/MenuInfor";
import MenuMusic from "@/features/leftSide/menuMusic/MenuMusic";
import Link from "next/link";
import MenuPlaylist from "@/features/leftSide/menuPlaylist/MenuPlaylist";
import AudioTask from "@/features/audioTask/AudioTask";
import HeadTop from "@/features/header/HeadTop";
import { GemIcon } from "@/svg/svg";
const inter = Work_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Tapu Music",
  description: "Project Music",
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={inter.className} suppressHydrationWarning={true}>
        <AppContextProvider>
          <div className={`flex sectionMain `}>
            <nav className='leftSide  pt-3 overflow-y-scroll shrink-0 basis-20  lg:basis-72 '>
              {/* Logo web */}
              <div className='flex justify-center md:justify-normal md:m-2 md:ms-5'>
                <Link href={"/"}>
                  <Image
                    src='/favicon.ico'
                    priority={true}
                    width={40}
                    height={40}
                    alt='Logo Music'
                    className=''
                  />
                </Link>
              </div>
              <MenuInfor />
              <hr className='m-3 border-gray-600	 rounded' />
              <MenuMusic />

              {/* Upgrade VIP */}
              <div className=' m-4 p-3 rounded-lg bg-gradient-to-r from-sky-950/80 to-blue-700/70 '>
                <p className='text-center text-xs text-white font-semibold lg:block hidden	'>
                  Nghe nhạc không quảng cáo cùng kho nhạc VIP
                </p>
                <div className='flex justify-center items-center '>
                  <GemIcon className='bi bi-gem block lg:hidden text-white cursor-pointer shrink-0' />
                </div>
                <div className='text-center lg:my-3'>
                  <Link
                    href='#'
                    className='bg-yellow-400  hidden lg:block	py-2 px-5 rounded-full font-semibold text-[50%] whitespace-nowrap'>
                    NÂNG CẤP VIP
                  </Link>
                </div>
              </div>

              <hr className='m-3 border-gray-600	 rounded' />
              <MenuPlaylist />
            </nav>

            <main className='w-full'>
              {/* Header */}
              <nav>
                <HeadTop />
              </nav>
              <div>{children}</div>
            </main>
          </div>
          <footer className={`sectionFooter`}>
            <AudioTask />
          </footer>
        </AppContextProvider>
      </body>
    </html>
  );
}
