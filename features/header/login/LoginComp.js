"use client";
import { useState, useEffect, useContext } from "react";
import { urlLogin } from "@/api/allApi";
import axios from "axios";
import { AppContext } from "@/context/context";
import { Button } from "antd";
import { AtSymbolIcon, EyeIcon, SlashEyeIcon } from "@/svg/svg";
const LoginComp = () => {
  const [userLogin, setUserLogin] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { state, dispatch } = useContext(AppContext);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const handleChangeEmail = (e) => {
    setUserLogin({ ...userLogin, email: e.target.value });
  };
  const handleChangePassword = (e) => {
    setUserLogin({ ...userLogin, password: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoadingLogin(true);
      const res = await axios.post(urlLogin, {
        email: userLogin.email,
        password: userLogin.password,
      });
      localStorage.setItem("accessKey", res.data.accessToken);
      dispatch({ type: "ADDUSERLOGIN", payload: res.data.data });
      setLoadingLogin(false);
      dispatch({ type: "SWITCHTOLOGIN" });
    } catch (error) {
      console.log("error:", error.response.data.message);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email input */}
        <div className='relative my-3'>
          <span className='sr-only'>Email</span>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
            <AtSymbolIcon className='h-5 w-5 text-slate-400' />
          </span>
          <input
            autoComplete='off'
            className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
            placeholder='Email đăng nhập'
            type='email'
            name='email'
            required
            onChange={handleChangeEmail}
            value={userLogin.email}
          />
        </div>

        {/* Password input */}
        <div className='relative my-3'>
          <span className='sr-only'>Password</span>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
            {showPassword ? (
              <div
                onClick={() => {
                  setShowPassword(false);
                }}>
                <EyeIcon className='w-5 h-5 text-slate-400 cursor-pointer' />
              </div>
            ) : (
              <div
                onClick={() => {
                  setShowPassword(true);
                }}>
                <SlashEyeIcon className='w-5 h-5 text-slate-400 cursor-pointer' />
              </div>
            )}
          </span>
          <input
            autoComplete='off'
            className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
            placeholder='Mật khẩu đăng nhập'
            type={showPassword ? "text" : "password"}
            name='password'
            required
            onChange={handleChangePassword}
            value={userLogin.password}
          />
        </div>

        <Button
          loading={loadingLogin}
          className='btn btn-active btn-primary w-full my-2 flex justify-center items-center'
          type='submit'
          onClick={handleSubmit}>
          Đăng nhập
        </Button>
      </form>
    </div>
  );
};

export default LoginComp;
