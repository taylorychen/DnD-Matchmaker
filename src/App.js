import React from "react";
import PageLogin from "./pages/PageLogin";
import PagePostings from "./pages/PagePosts";
import Profile from "./pages/profile";
import Error from "./components/404";

import { Switch, Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PageLogin />} />
                <Route exact path="/Postings" element={<PagePostings />} />
                <Route exact path="/Profile" element={<Profile />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
