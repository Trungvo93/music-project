"use client";
import { useState } from "react";
import axios from "axios";
const Recently = () => {
  const [accessToken, setAccessToken] = useState();
  const handleLogin = async () => {
    const res = await axios.post(
      `https://api-kaito-music.vercel.app/api/account/login`,
      {
        email: "tonecyber11@gmail.com",
        password: "12345678",
      }
    );
    setAccessToken(res.data.accessToken);
  };

  const handleGetHistory = async () => {
    console.log(accessToken);
    const res = await axios.post(
      `https://api-kaito-music.vercel.app/api/play-history/create`,
      { idMusic: "6438cbb5aa9627ecf4936532" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-type": "application/json",
        },
      }
    );
    console.log(res.data);
  };

  const handleCreatePersonalPlaylist = async () => {
    const res = await axios.post(
      `https://api-kaito-music.vercel.app/api/list-music/create`,
      { idMusic: "1", nameList: "hello" },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(res.data);
  };
  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleGetHistory}>Get History</button>
      <button onClick={handleCreatePersonalPlaylist}>
        Create Personal Playlist
      </button>
    </div>
  );
};

export default Recently;
