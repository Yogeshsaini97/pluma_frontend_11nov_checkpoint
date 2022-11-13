// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { React, useState } from "react";
//import ant design elements
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  KeyOutlined,
  MailOutlined
} from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";


export const Login = () => 

{


  const [Email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bool, setbool] = useState(false);
  const [emptyemail, setemptyemail] = useState(false);
  const [emptypassword, setemptypassword] = useState(false);


  //For navigation
  const Navigate=useNavigate();


  
  //function to handle Login onclick
  const loginfunc = (e) => {
    e.preventDefault();

    let emailarray = Email.split("");
    let passarray = password.split("");

    if (emailarray.length === 0) {
      setemptyemail(true);
    }

    if (passarray.length === 0) {
      setemptypassword(true);
    }

    if (emailarray.length > 0 && passarray.length > 0) {
      if (
        emailarray.includes("@") === false ||
        emailarray.includes(".") === false
      ) {
        setbool(true);
        return;
      } else {
        setbool(false);
        //here we are accepting all validations and suucessfully loging in
        Navigate("/home");

        return;
      }
    }

    return;
  };

  return (
    <>
      <div className="Logincomponent " style={{ scale: "55%" }}>
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
           </div>

          <Row className="container LoginContainer">
            <div className="containerLogin">
              <img
                style={{
                  position: "absolute",
                  zIndex: "4",
                  width: "18.0rem",
                  left: "-12.0rem",
                  top: "25.0rem"
                }}
                src="/assets/images/Group.png"
                alt="error"
              />
              <Button
                style={{
                  position: "absolute",
                  borderRadius: "10.0rem",
                  backgroundColor: "#505C8B",
                  color: "#fff",
                  fontSize: "4.0rem",
                  width: "5.8rem",
                  height: "5.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "Prompt",
                  fontWeight: "600",
                  right: "-3.0rem",
                  bottom: "3.0rem"
                }}
              >
                ?
              </Button>
              <div
                className="backgroundBlue"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  backgroundColor: "#505c8b",
                  zIndex: "-1",
                  borderRadius: "5.0rem"
                }}
              />
              {bool ? (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <div
                    style={{
                      marginTop: "-12.0rem",
                      backgroundColor: "#FF2E2E",
                      width: "37.3rem",
                      height: "3.5rem",
                      borderRadius: "1.2rem",
                      color: "#FFFFFF",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize: "1.6rem",
                      fontFamily: "prompt",
                      fontWeight: "500",
                      lineHeight: "2.117rem"
                    }}
                  >
                    please enter a valid email id or password
                  </div>

                  <div
                    style={{
                      height: "1.5rem",
                      width: "1.5rem",
                      backgroundColor: "#FF2E2E",
                      transform: "rotate(45deg)",
                      position: "absolute",
                      top: "-4.0rem"
                    }}
                  ></div>
                </div>
              ) : (
                <div></div>
              )}

              <div className="headingContainer">
                <h1 className="heading">Log In</h1>
              </div>
              <Col className="inputContainer" style={{height: "15.5rem"}}>
                <Col className="inputForm">
                
                  <Input
                    className="inputAnt"
                    id="emailinput"
                    placeholder="Email"
                    value={Email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setbool(false);
                      setemptyemail(false);
                    }}
                    prefix={<MailOutlined />}
                  />
                  {emptyemail && <div style={{color:"red",position:"absolute",top:"8%" ,marginLeft:"5%"}}>Email can,t be empty!</div>}
                  
                </Col>
                
                <Col className="inputForm"  >
                  <Input.Password
                 
                    id="passinput"
                    className="inputAnt"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value);setemptypassword(false);}}
                    prefix={<KeyOutlined />}
                    iconRender={(visible) =>
                      visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                    }
                  />
                  {emptypassword && <div style={{color:"red",position:"absolute",top:"70%" ,marginLeft:"5%"}}>Password can,t be empty!</div>}
                </Col>
              </Col>

              <Button
                type="primary"
                onClick={loginfunc}
                style={{
                  Size: "1.4rem",
                  fontFamily: "Prompt",
                  backgroundColor: "#FFB8B1",
                  fontWeight: "500",
                  borderRadius: "1.0rem",
                  border: "0rem",
                  width: "16.0rem",
                  height: "4.0rem",
                  color: "black",
                  top: "2.0rem",
                  position: "relative"
                }}
              >
                Get Started
              </Button>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "8.0rem"
                }}
              >
                <div
                  style={{
                    marginTop: "1.0rem",
                    font: "Prompt",
                    fontWeight: "400"
                  }}
                >
                  Don’t have an account ?
                </div>
                <Link to="/createAccount" style={{ color: '#000AFF', font: 'Prompt', fontWeight: '500' }}>
            Create account.
          </Link>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};
