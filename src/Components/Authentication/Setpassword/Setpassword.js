import { React } from "react";
import { Button, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";
import "./Setpassword.css";


export const Setpassword = () => {
  return (
    <>
      <div className="Logincomponent">
        <div>
          <Row
                style={{ position: "relative", top: "16rem",scale:"55%" }}
            className="container LoginContainer"
          >
            <div className="containerLogin">
              <img
                style={{
                  position: "absolute",
                  zIndex: "4",
                  width: "17rem",
                  left: "-11rem",
                  top: "25rem"
                }}
                src="/assets/images/Group.png"
                alt="error"
              />
              <Button
                style={{
                  position: "absolute",
                  borderRadius: "10rem",
                  backgroundColor: "#505C8B",
                  color: "#fff",
                  fontSize: "4rem",
                  width: "5.8rem",
                  height: "5.7rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  font: "Prompt",
                  fontWeight: "600",
                  right: "-3rem",
                  bottom: "3rem"
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
                  borderRadius: "5rem"
                }}
              />

              <div className="headingContainer">
                <h1 className="heading">Set your password</h1>
              </div>
              <div className="haveAccount">
                <span>Please set a new password for your account</span>
              </div>

              <Col className="inputContainer">
                <Col className="inputForm">
                  <Col>New Password</Col>
                  <Input
                    className="inputAnt"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "1.5rem",
                      top: "-0.9rem"
                    }}
                    placeholder="Enter your Email here"
                  />
                </Col>
                <Col className="inputForm">
                  <Col>Confirm Password</Col>
                  <Input
                    className="inputAnt"
                    style={{
                      padding: "1.5rem",
                      borderRadius: "1.5rem",
                      top: "-0.9rem"
                    }}
                    placeholder="Enter your Password here"
                  />
                </Col>
              </Col>

              <Button
                type="primary"
                style={{
                  marginTop: "5rem",
                  backgroundColor: "#FFB600",
                  borderRadius: "1rem",
                  border: "2rem",
                  width: "28rem",
                  height: "60rem"
                }}
              >
                Set Password
              </Button>
              <div style={{ marginTop: "5rem" }}>
                By logging in you our Terms and Conditions
              </div>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <span style={{ marginTop: "8rem" }}>- OR -</span>
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "space-between",
                    maxWidth: "60rem",
                    marginTop: "5%"
                  }}
                >
                  <Button style={{ height: "6rem", borderRadius: "1rem" }}>
                    <img src="/assets/images/Google.png" alt="error" />
                    Sign up with Google
                  </Button>
                  <Button style={{ height: "6rem", borderRadius: "1rem" }}>
                    <img src="/assets/images/GitHub.png" alt="error" />
                    Sign up with GitHub
                  </Button>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};
