import React from "react";
import PageLogin from "./pages/PageLogin";
import PagePosts from "./pages/PagePosts";
import PageProfile from "./pages/PageProfile";
import Error from "./components/404";

import { Switch, Route, Routes, BrowserRouter } from "react-router-dom";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<PageLogin />} />
                <Route exact path="/Postings" element={<PagePosts />} />
                <Route exact path="/Profile" element={<PageProfile />} />
                <Route path="*" element={<Error />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
