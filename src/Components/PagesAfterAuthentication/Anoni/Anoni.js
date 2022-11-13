// our main component from where all home pages are linked
import React, { useState} from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Layout } from "antd";
// import "./Afterloginsidenav.css";
import { UserOutlined, LogoutOutlined,CaretRightFilled } from "@ant-design/icons";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Live } from "./Live";
import { Calibrate } from "./Calibrate";
import { Startsession } from "./Startsession";
import { Sidermain } from "../../../Other Components/Sidermain/Sidermain";
import { fetchApi } from "../Presentation/utils";




const { Footer, Content } = Layout;

export const Anoni = () => {
  //using browxser location so that we can match it later with our ternary condition statements
  const location = useLocation();
  const path = location.pathname;


  // // const path="/Anoni";
  // // const path="/list";
  // // const path="/faq";


  console.log(location.pathname);
  const canvasHeight = 465;
  const canvasWidth = 940; //changed
  const [progressIndex, setProgressIndex] = useState(0);
  const [presentationName, setPresentationName] = useState("");
  const [pid, setPid] = useState(undefined);
  const [publishKey, setPublishKey] = useState(undefined);
  const [cameraShape, setCameraShape] = useState([undefined, undefined]);

  const corners = {};

  ["NW", "NE", "SE", "SW"].forEach((key) => {
    corners[key] = useState(undefined);
  });

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  function createPresentation() {
    console.log(presentationName + "  " + cameraShape + "  " + corners);
      fetchApi('/api/presentation', 'POST', {
        'name': presentationName,
        'camera_shape': cameraShape,
        'corners': Object.fromEntries(Object.entries(corners).map(([key, value]) => [key, value[0]]))
      }).then((response) => {
        if (!response.ok) {
          console.log("inside create")
    throw new Error('Unable to create a presentation');
        }
        return response.json();
      }).then((data) => {
        console.log("outside create")
        console.log("id->" +  data.id)
        setPid(data.id);
        console.log("publish key->" + data.publish_key)
        setPublishKey(data.publish_key);
        setProgressIndex(2);
      });
    // setPid("NWmMEdzqyBzRTbk");
    // setPublishKey("GzzRSObHfhyXZlm");
    // setProgressIndex(2);
  }

  function goToNext() {
    if (progressIndex == 2) {
      window.location.reload();
      // console.log("ingoto")
    } else if (progressIndex == 1) {
      createPresentation();
    } else {
      // eslint-disable-next-line no-unused-vars
      setProgressIndex((state, props) => state + 1);
    }
  }

  function nextButton() {
    var name = "Start Session";
    if (progressIndex == 1) {
      name = `Next`;
    } else if (progressIndex == 2) {
      name = "Stop";
    }

    return (
      <Button
        type="submit"
        onClick={goToNext}
        style={{height: "3rem",
    width: "10rem",fontSize:"1rem"}}
      >
        {name}
       
      </Button>
    );
  }



  function initialCorners()
   {
    const savedCorners = localStorage.getItem("corners");
    if (savedCorners === null) {
      return {
        NW: { x: 20, y: 20 },
        NE: { x: canvasWidth - 20, y: 20 },
        SE: { x: canvasWidth - 20, y: canvasHeight - 20 },
        SW: { x: 20, y: canvasHeight - 20 },
      };
    } else {
      return JSON.parse(savedCorners);
    }
  }

  return (
    <>
      <Container fluid>
        <Row
          className="mx-5"
          //  style={{ backgroundColor: "red" }}
        >
          <Col
            className="d-flex justify-content-center firstcol"
            sm={1}
            // style={{ backgroundColor: "purple" }}
          >
           <Sidermain/>
          </Col>

          {/* main right side */}
          <Col
            sm={11}
            // style={{ backgroundColor: "pink" }}
            className="d-flex justify-content-center align-items-center "
          >
            <div
              className="rightpinkcontainer mx-3"
              style={{
                // border: "2px solid black",
                height: "100%",
                width: "100%",
              }}
            >
              <div
                style={{
                  // border: "2px solid black",
                  height: "15%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  alignContent: "center",
                }}
              >
                <div
                  style={{
                    // border: "2px solid red",
                    paddingTop: "4rem",
                  }}
                >
                  <div
                    classname="welcometext"
                    style={{
                      fontWeight: "500",
                      fontSize: "2.0rem",
                      color: "#505C8B",
                    }}
                  >
                    <p>Hi {localStorage.getItem('FullName')}, Welcome!</p>
                  </div>
                </div>
                <div style={{ marginTop: "5rem", marginRight: "6rem",zIndex:"1" }}>
              
                  <img
                    style={{ Height: "8rem", Width: "8rem" }}
                    src="/assets/images/Girlprofilepic.png"
                    alt="error"
                  />
                </div>
              </div>
              <div
                className={progressIndex === 2 ? "bg-white" : ""}
                style={{
                  display: "flex",
                  alignContent: "center",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  // border:"2px solid black",
                  backgroundColor: "#F6F6F6",
                  height: "80%",
                  borderRadius: "10px",
                  width: "100%",
                }}
              >
                {path === "/Anoni" ? (
                  <>
                    <video id="video" autoPlay hidden></video>

                    {progressIndex === 0 && (
                      <>
                        {true ? <>{Startsession()}</> : <div></div>}

                        <Form.Control
                          className="my-3"
                          style={{ width: "40rem", lineHeight: "2rem" ,fontSize:"1.2rem"}}
                          required
                          type="text"
                          placeholder="Enter Session Name"
                          prefix={<UserOutlined />}
                        />

                        {nextButton()}
                      </>
                    )}

                    {progressIndex === 1 && (
                      <>
                        <div
                          style={{
                            // border: "2px solid black",
                            display: "flex",
                            width: "100%",
                            justifyContent: "space-between",
                            paddingRight: "6rem",
                            height: "95%",
                            alignItems: "stretch",
                            alignContent: "stretch",
                            marginTop: "0rem",
                          }}
                        >
                          <div>
                            <Calibrate
                              width={940} //changed
                              height={465}
                              corners={initialCorners()}
                              onCameraChange={(width, height) =>
                                setCameraShape([height, width])
                              }
                              onCornerChange={(key, x, y) =>
                                corners[key][1]([x, y])
                              }
                            />
                          </div>
                          <div
                            style={{
                              //  backgroundColor: "gold",
                              // border:"2px solid black",

                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "space-around",
                            }}
                          >
                            <div>{nextButton()}</div>
                            {true ? (
                              <div
                                className="my-1"
                                style={{
                                  display: "flex",
                                  flexDirection: "row-reverse",
                                  justifyContent: "center",
                                  alignItems: "center",
                                }}
                              >
                                <div
                                  style={{
                                    backgroundColor: "#FFFFFF",
                                    width: "13.3rem",
                                    height: "14.5rem",
                                    borderRadius: "1.2rem",
                                    color: "#161616",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    fontSize: "0.8rem",
                                    fontFamily: "prompt",
                                    fontWeight: "500",
                                    lineHeight: "2.117rem",
                                    boxShadow: "0px 4px 7px 0px black",
                                    zIndex: "0",
                                  }}
                                >
                                  Click on the boundaries to configure the
                                  camera capture area . Once you are happy with
                                  your selection please click on the next to
                                  generate the session URL
                                </div>

                                <div
                                  style={{
                                    height: "1.5rem",
                                    width: "1.5rem",
                                    backgroundColor: "#FFFFFF",
                                    transform: "rotate(45deg)",
                                    position: "relative",
                                    left: "1rem",
                                  }}
                                ></div>
                              </div>
                            ) : (
                              <div></div>
                            )}
                          </div>
                        </div>
                      </>
                    )}

                    {progressIndex === 2 && (
                       
                      <Live pid={pid} publishKey={publishKey} />
                      
                     
                      
                      
                    
                    )}
                  </>
                ) : (
                  <></>
                )}




                {path === "/list" ? <>i am list page</> : <></>}
                {path === "/faq" ? <>i am Faq page</> : <></>}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};
