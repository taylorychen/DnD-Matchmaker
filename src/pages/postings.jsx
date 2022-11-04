import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PostingCards from "../components/postings-card";

function Postings(){
    return(
        <div>
            <Header></Header>
            <h1>hi! Welcome to the postings page/landing page</h1>
            <button onClick="sayHello()">
                create a new posting
            </button>
            <PostingCards></PostingCards>
            <Footer></Footer>
        </div>
    );
}

export default Postings;