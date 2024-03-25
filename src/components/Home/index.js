import Header from "../Header/";
import Footer from "../Footer";
import React from "react";
import Images from "./image"
import "./index.css";
import Blogs from "../Blogs"


const Home = () => {
const token = localStorage.getItem("token");

return (
<div>
    {token ?
     <>
    <Header hideAuthButtons={true} />      
    <Blogs />
    <Footer />
    </> 
    :
    <>
    <Header />      
    <Images /> 
    <Footer />
    </>
    }
   
</div>
)
};

export default Home;