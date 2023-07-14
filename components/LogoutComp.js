"use client";
import { useState, useEffect, useContext, useRef } from "react";
import { urlRegister } from "../api/allApi";
import axios from "axios";
import { AppContext } from "../context/context";
const LogoutComp = () => {
  const [userRegister, setUserRegister] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
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
        const res = await axios.post(urlRegister, {
          userName: userRegister.username,
          email: userRegister.email,
          password: userRegister.password,
        });
        console.log(res.data.data);
        localStorage.setItem("accessKey", res.data.accessToken);
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5 text-slate-400'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z'
              />
            </svg>
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
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='h-5 w-5 text-slate-400'>
              <path
                strokeLinecap='round'
                d='M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25'
              />
            </svg>
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 text-slate-400 cursor-pointer'
                onClick={() => {
                  setShowPassword(false);
                }}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 text-slate-400 cursor-pointer'
                onClick={() => {
                  setShowPassword(true);
                }}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
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
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 text-slate-400 cursor-pointer'
                onClick={() => {
                  setShowConfirmPassword(false);
                }}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88'
                />
              </svg>
            ) : (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-5 h-5 text-slate-400 cursor-pointer'
                onClick={() => {
                  setShowConfirmPassword(true);
                }}>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z'
                />
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
                />
              </svg>
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
        <button
          className='btn btn-active btn-primary w-full my-2'
          type='submit'>
          Đăng ký
        </button>
      </form>
    </div>
  );
};

export default LogoutComp;
