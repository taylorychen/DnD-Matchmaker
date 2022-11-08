import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import PostingCards from "../components/postings-card";
import ModalCreate from "../components/modal-create";

function Postings(){
    return(
        <div>
            <Header></Header>
            <br></br>
            <h1><center>Postings: Find Your Perfect Match</center></h1>
            <label>Search: </label>
            <input type="search" id="search" name="search"></input>
            <ModalCreate></ModalCreate>
            <PostingCards></PostingCards>
            <Footer></Footer>
        </div>
    );
}

export default Postings;