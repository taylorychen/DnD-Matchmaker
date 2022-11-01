import React from 'react';
import Login from './pages/login';
import Postings from './pages/postings';
import Profile from './pages/profile';
import Error from './pages/404';

import { Switch, Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route exact path="/" element={<Login />}/>
          <Route exact path="/Postings" element={<Postings />}/>
          <Route exact path="/Profile" element={<Profile />}/>
          <Route path="*" element={<Error />}/>
      </Routes>
    </BrowserRouter>
  
  );
}

export default App