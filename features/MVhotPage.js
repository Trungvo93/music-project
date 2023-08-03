"use client";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { Modal, Button } from "antd";
import Image from "next/image";
import { PlayIcon } from "@/svg/svg";
const MVhotPage = ({ listTrending }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemMV, setItemMV] = useState();
  const youtubeRef = useRef();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = async () => {
    await setItemMV(null);
    setIsModalOpen(false);
  };
  const handleShowMV = (item) => {
    setItemMV(item);
    showModal();
  };

  // Get the Window’s Width on Resize
  const [windowWidth, setWindowWidth] = useState();
  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleWindowResize);

      return () => {
        window.removeEventListener("resize", handleWindowResize);
      };
    }
  });
  console.log(windowWidth);
  return (
    <div className='m-6'>
      <div>
        <p className='text-2xl font-semibold'>MV HOT</p>
      </div>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {listTrending.map((item, index) => (
          <div key={index} className='flex gap-3 relative group'>
            <div className='w-full h-full absolute bg-black opacity-30 inset-0 -z-10 group-hover:z-20'></div>
            <div className='relative w-full'>
              <Image
                src={`http://img.youtube.com/vi/${item.link_mv}/0.jpg`}
                alt={item.slug_name_music}
                width={500}
                height={500}
                className='w-full h-auto'
              />
              <p className='absolute bottom-2 left-3 text-white z-30'>
                {item.name_music}
              </p>
            </div>
            <div className='absolute  w-full h-full -z-10 group-hover:z-30'>
              <div onClick={() => handleShowMV(item)}>
                <PlayIcon className='w-10 h-10 text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  cursor-pointer hover:text-yellow-500  ' />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal
        title={itemMV ? itemMV.name_music : ""}
        open={isModalOpen}
        footer={null}
        onOk={handleOk}
        onCancel={handleCancel}
        width={windowWidth > 1024 ? "75%" : "100%"}>
        <iframe
          src={`https://www.youtube.com/embed/${itemMV ? itemMV.link_mv : ""}`}
          title={itemMV ? itemMV.name_music : ""}
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
          className='aspect-video w-full'></iframe>
      </Modal>
    </div>
  );
};

export default MVhotPage;
