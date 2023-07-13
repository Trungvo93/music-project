import "./globals.css";
import { AppContextProvider } from "../context/context";
import { Work_Sans } from "next/font/google";
import Image from "next/image";
import MenuInfor from "@/features/MenuInfor";
import MenuMusic from "@/features/MenuMusic";
import Link from "next/link";
import MenuPlaylist from "@/features/MenuPlaylist";
import AudioTask from "@/features/AudioTask";
import HeadTop from "@/features/HeadTop";
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
          <div
            className={`grid grid-cols-12 
              sectionMain
           `}>
            <nav className='col-span-2 leftSide  pt-3 overflow-y-scroll	'>
              {/* Logo web */}
              <div className='flex justify-center md:justify-normal md:m-2 md:ms-5'>
                <Image
                  src='/favicon.ico'
                  priority={true}
                  width={40}
                  height={40}
                  alt='Logo Music'
                  className=''
                />
              </div>
              <MenuInfor />
              <hr className='m-3 border-gray-600	 rounded' />
              <MenuMusic />

              {/* Upgrade VIP */}
              <div className=' m-4 p-3 rounded-lg bg-gradient-to-r from-sky-950/80 to-blue-700/70 '>
                <p className='text-center text-xs text-white font-semibold sm:block hidden	'>
                  Nghe nhạc không quảng cáo cùng kho nhạc VIP
                </p>
                <div className='flex justify-center items-center '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    className='bi bi-gem block sm:hidden text-white cursor-pointer shrink-0'
                    viewBox='0 0 16 16'>
                    <path d='M3.1.7a.5.5 0 0 1 .4-.2h9a.5.5 0 0 1 .4.2l2.976 3.974c.149.185.156.45.01.644L8.4 15.3a.5.5 0 0 1-.8 0L.1 5.3a.5.5 0 0 1 0-.6l3-4zm11.386 3.785-1.806-2.41-.776 2.413 2.582-.003zm-3.633.004.961-2.989H4.186l.963 2.995 5.704-.006zM5.47 5.495 8 13.366l2.532-7.876-5.062.005zm-1.371-.999-.78-2.422-1.818 2.425 2.598-.003zM1.499 5.5l5.113 6.817-2.192-6.82L1.5 5.5zm7.889 6.817 5.123-6.83-2.928.002-2.195 6.828z' />
                  </svg>
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
            <main className='col-span-10 '>
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
