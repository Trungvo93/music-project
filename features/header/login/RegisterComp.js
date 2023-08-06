"use client";
import { useState, useEffect, useContext } from "react";
import { urlRegister } from "@/api/allApi";
import axios from "axios";
import { AppContext } from "@/context/context";
import { AtSymbolIcon, EyeIcon, PersonIcon, SlashEyeIcon } from "@/svg/svg";
import { Button } from "antd";
const RegisterComp = () => {
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { state, dispatch } = useContext(AppContext);

  const handleChangeUsername = (e) => {
    setUserRegister({ ...userRegister, username: e.target.value });
  };
  const handleChangeEmail = (e) => {
    setUserRegister({ ...userRegister, email: e.target.value });
  };
  const handleChangePassword = (e) => {
    setUserRegister({ ...userRegister, password: e.target.value });
  };
  const handleChangeConfirmPassword = (e) => {
    setUserRegister({ ...userRegister, confirmPassword: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userRegister.password === userRegister.confirmPassword) {
      try {
        setLoading(true);
        const res = await axios.post(urlRegister, {
          userName: userRegister.username,
          email: userRegister.email,
          password: userRegister.password,
        });
        console.log(res.data.data);
        localStorage.setItem("accessKey", res.data.accessToken);
        setLoading;
        false;
        dispatch({ type: "ADDUSERLOGIN", payload: res.data.data });
        dispatch({ type: "SWITCHTOLOGIN" });
      } catch (error) {
        console.log("error:", error.response.data.message);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Username input */}
        <div className='relative my-3'>
          <span className='sr-only'>Username</span>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
            <PersonIcon className='h-4 w-4 text-slate-400' />
          </span>
          <input
            autoComplete='off'
            className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
            placeholder='Tên người dùng'
            type='text'
            name='username'
            required
            onChange={handleChangeUsername}
            value={userRegister.username}
          />
        </div>
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
            pattern='([A-Za-z0-9][._]?)+[A-Za-z0-9]@[A-Za-z0-9]+(\.?[A-Za-z0-9]){2}\.(com?|net|org)+(\.[A-Za-z0-9]{2,4})?'
            title='Email không đúng định dạng'
            onChange={handleChangeEmail}
            value={userRegister.email}
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
            pattern='.{8,}'
            title='Mật khẩu ít nhất 8 kí tự'
            onChange={handleChangePassword}
            value={userRegister.password}
          />
        </div>

        {/* Confirm Password input */}
        <div className='relative my-3'>
          <span className='sr-only'>Confirm Password</span>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3 h-[37.6px]'>
            {showConfirmPassword ? (
              <div
                onClick={() => {
                  setShowConfirmPassword(false);
                }}>
                <EyeIcon className='w-5 h-5 text-slate-400 cursor-pointer' />
              </div>
            ) : (
              <div
                onClick={() => {
                  setShowConfirmPassword(true);
                }}>
                <SlashEyeIcon className='w-5 h-5 text-slate-400 cursor-pointer' />
              </div>
            )}
          </span>
          <input
            autoComplete='off'
            className={`placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm`}
            placeholder='Xác nhận mật khẩu đăng nhập'
            type={showConfirmPassword ? "text" : "password"}
            name='password'
            required
            onChange={handleChangeConfirmPassword}
            value={userRegister.confirmPassword}
          />
        </div>
        <div>
          {userRegister.confirmPassword !== "" &&
          userRegister.confirmPassword !== userRegister.password ? (
            <p className='text-rose-600  text-xs'>
              Xác nhận mật khẩu không khớp
            </p>
          ) : (
            ""
          )}
        </div>
        <Button
          onClick={handleSubmit}
          loading={loading}
          className='btn btn-active btn-primary w-full my-2 inline-flex justify-center items-center'
          type='submit'>
          Đăng ký
        </Button>
      </form>
    </div>
  );
};

export default RegisterComp;
