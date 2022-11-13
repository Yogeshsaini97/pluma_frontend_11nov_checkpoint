import { React, useState } from "react";
import {  Col, Row,} from "antd";
import "./ThankYou.css";
import { Link } from "react-router-dom";


export const Thankyou = () => {
 

  return (
    <div className="registerealfirst">
 
      <div>
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
          <h1 className="heading">Thank You!</h1>
        </div>

            <Col className="inputContainer">
          <div>
            <div className="endText">
              We have sent an email with her confirmation link to your email address. In order to complete the signup process, please click the
              confirmation link.
            </div>
            <div className="endText">
              If you did not receive a confirmation email, please check your spam folder. Also, please verify that you entered a valid email address
              in your sign-up form.
            </div>
            <div className="endText" style={{ marginBottom: '8.0rem' }}>
              {/* If you need assistance please &nbsp;<Link style={{ color: '#000AFF' }}>contact us.</Link> */}
            </div>
          </div>
        </Col>

  
          </div>
        </Row>
      </div>
    </div>
  );
};
