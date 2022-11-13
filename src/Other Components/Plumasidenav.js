import React from "react";
import { Layout } from "antd";


const { Footer, Content } = Layout;

const Plumasidenav = () => {
  return (
    <div className="sidepluma d-flex justify-content-start  " 
    // style={{backgroundColor:"orange"}}
    >
      <img
        style={{
        position:"relative",
        top:"1.2rem",
        
         marginLeft:"3rem",
         marginTop:"0.5rem"
        
         
        }}
        src="/assets/images/Logo.png"
        alt="error"
      />
    </div>
    
    
  );
};

export default Plumasidenav;
