import { Route, Routes } from "react-router-dom"
import HomePage from "./routegaurd/Newhome";
import Settings from "./routegaurd/Settings";
import LoginPage from "./routegaurd/loginpage";
import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import bootstrap from 'bootstrap'

import './styles/index.scss';

const Wrapper = ({ children }) => {
  const [auth,setAuth] = useState();

  useEffect(() => {
    if(localStorage.getItem('Name')){
      setAuth(localStorage.getItem('Name'));
      // navigate(location.pathname)
    }
  },[]);
  return <div>
    <h1>Todoapp</h1>
    {auth ? children : ""}  <div></div>
  </div>
}

const PubWrapper = ({ children }) => {
  const [pubauth,setPubauth] = useState();
  const navigate = useNavigate()
  
  useEffect(() => {
    if(!localStorage.getItem('Name')){
      setPubauth(true);
    } else{
      navigate("/homepage")
    }
  },[]);
  return <div>
    {/* <h1>Title 3333</h1> */}
    {pubauth ? children : ""}  <div></div>
  </div>
}

function App() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Routes>
      <Route path="/" element={<PubWrapper><LoginPage /></PubWrapper>} />
      <Route path="/homepage" element={<Wrapper><HomePage /></Wrapper>} />
      <Route path="/settings" element={<Wrapper><Settings></Settings></Wrapper>} />
    </Routes>
  );
}

export default App;
