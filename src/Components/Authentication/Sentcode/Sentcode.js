import { React } from "react";
//import ant design elements
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row } from "antd";
import { Link } from "react-router-dom";
import "./Sentcode.css";

export const Sentcode = () => {
  return (
    <>
      <div className="Logincomponent">
        <div>
          <Row
            style={{ position: "relative", top: "29.5rem" }}
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
                  borderRadius: "5rem"
                }}
              />

              <div
                style={{ marginTop: "5%", display: "flex" }}
                className="heading"
              >
                <Link to="/CreateAccount">
                  <ArrowLeftOutlined
                    style={{ fontSize: "4rem", color: "#EAB354" }}
                  />
                </Link>
                <h1 style={{ height: "4.5rem", marginLeft: "2rem" }}>
                  OK! We sent you a Code
                </h1>
              </div>
              <div
                className="haveAccount"
                style={{ marginTop: "11.8rem", width: "75%" }}
              >
                <span>
                  Please enter the code sent to abcd@google.com within next 30
                  minutes.
                </span>
              </div>
              <Col className="inputContainer">
                <Col className="inputForm">
                  <div
                    style={{
                      marginBottom: "2.4rem",

                      marginLeft: "1.6rem"
                    }}
                  >
                    <Col>Code</Col>
                  </div>
                  <Input
                    className="inputAnt"
                    style={{ padding: "1.5rem", borderRadius: "1.5rem" }}
                    placeholder="Enter the code here"
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
                  height: "5rem"
                }}
              >
                Continue
              </Button>
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-around"
                }}
              >
                <span style={{ marginTop: "5rem" }}>- OR -</span>
                <div
                  style={{
                    width: "70%",
                    display: "flex",
                    justifyContent: "center",
                    maxWidth: "60rem",
                    marginTop: "5%",
                    height: "4rem"
                  }}
                >
                  <div>Didnot receive the link? </div>
                  <Link style={{ color: "#EAB354" }} to="/SentCode">
                    Send it again.
                  </Link>
                </div>
              </div>
            </div>
          </Row>
        </div>
      </div>
    </>
  );
};
