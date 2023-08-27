/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React,{ createContext, useContext, useState } from "react";

const InitialGlobalContext = {
  number: "",
  setNumber: (string) => {},
  user: null,
  setUser: (user) => {},
}

// user_data = {
//   "username": user.username,
//   "dob": user.dob,
//   "gender": user.gender,
//   "number": user.number,
//   "classOfUser": user.classOfUser
// }

const GlobalContext = createContext(InitialGlobalContext);

export const GlobalContextProvider = ({children}) => {
  const [number, setNumber] = useState("");
  const [verified, setVerified] = useState(false);
  const [user, setUser] = useState();

  return (
    <GlobalContext.Provider value={{number, setNumber, user, setUser}}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext);