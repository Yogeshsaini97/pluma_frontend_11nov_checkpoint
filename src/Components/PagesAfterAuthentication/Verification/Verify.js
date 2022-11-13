import React, { useState, useEffect,useRef } from "react";
import {  Col, Row,} from "antd";
import "../../Authentication/ThankYou/ThankYou.css";
import { Link } from "react-router-dom";
import { fetchApi } from "../Presentation/utils";
import Button from "react-bootstrap/Button";
// import { useRouter } from "next/router";

import { useParams } from "react-router-dom";
import { Loading } from "../../../Other Components/Loading/Loading";

export const Verify=()=> {
  // const router = useRouter();
  const [state, setState] = useState("verifying");
  const [Loader, setLoader] = useState(false);
  const para=useParams();
  const dataFetchedRef = useRef(false);

  useEffect(() => {
    if (para._id) {
      // const { id } = router.query;

      if (dataFetchedRef.current) {
        setLoader(true);
        console.log("inside usefefdf")
        fetchApi(`api/user/verify/${para._id}`, "POST", {}, false).then((response) => {
          if (!response.ok) {
            setLoader(false);

            setState("failed");
            return;
          }
          setLoader(false);
            setState("verified");
        });
      }
      dataFetchedRef.current = true;
    
    }
  }, [para._id]);




 const verified=()=>
 {

   
  return(<><div className="my-5" style={{fontSize:"3rem"}}>You are successfully verified</div>
  <div style={{fontSize:"3rem"}}>Click here to get back to login: </div>
  <Link to="/newLogin"><Button style={{marginTop:"8rem",height:"6rem",width:"17rem",fontSize:"1.5rem"}}>Go to Login</Button></Link> </>)

 }

 const uhoh=()=>
 {

   



  return(<><div className="my-5" style={{fontSize:"3rem"}}>Email Already Registered!</div>
  <div style={{fontSize:"3rem"}}>Please use another Email </div>
  <Link to="/createAccount"><Button style={{marginTop:"8rem",height:"6rem",width:"17rem",fontSize:"1.5rem"}}>Go back to Register</Button></Link></>)

 }


  return (<>
    {Loader?<Loading/>:<div className="registerealfirst"><div>
      <Row className="container" style={{marginTop: "30rem",
  marginLeft:"25rem",

  scale:"60%"}} >
        <div className="containerLogin">
          <img
            style={{
              position: "absolute",
              zIndex: "4",
              width: "17.0rem",
              right: "-16.0rem",
              top: "0rem",
            }}
            src="/assets/images/GirlRegistr.png"
            alt="error"
          />
         <div className="backgroundBlue" />
      <div className="headingContainer">
        {state === "verified"?<h1 className="heading">Great!</h1>:<h1 className="heading">UH OH!!</h1>}
        {state === "verified"?verified():uhoh()}
       
      </div>

          <Col className="inputContainer">
              
      </Col>


        </div>
      </Row>
    </div>
  </div>
  }
  </>
    
  );



}
