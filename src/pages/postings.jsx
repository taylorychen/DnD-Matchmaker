import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";

function Postings(){
    return(
        <div>
            <Header></Header>
            <h1>hi! Welcome to the postings page/landing page</h1>
            <button onclick="sayHello()">
                create a new posting
            </button>
            <Footer></Footer>
        </div>
    );
}

export default Postings;