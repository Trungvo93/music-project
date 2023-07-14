"use client";
import { createContext, Dispatch, useReducer } from "react";

const initialState = {
  playList: [],
  firstPlay: false,
  userLogged: null,
  isLogin: false,
};

const reducer = (state, action) => {
  const { payload, type } = action;
  switch (type) {
    case "ADDPLAYLIST":
      return { ...state, playList: [...payload] };
    case "REMOVEPLAYLIST":
      return { ...state, playList: [] };
    case "FIRSTPLAY":
      return { ...state, firstPlay: true };
    case "ADDUSERLOGIN":
      return { ...state, userLogged: { ...payload } };
    case "REMOVEUSERLOGIN":
      return { ...state, userLogged: null };
    case "SWITCHTOLOGIN":
      return { ...state, isLogin: true };
    case "SWITCHTOLOGOUT":
      return { ...state, isLogin: false };
    default:
      return state;
  }
};

export const AppContext = createContext({
  state: initialState,
  dispatch: () => null,
});
export const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
