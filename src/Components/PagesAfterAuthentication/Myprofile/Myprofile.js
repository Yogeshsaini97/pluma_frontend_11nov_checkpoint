import { Layout } from "antd";
import React from "react";
import { Checkbox, Col, Input, Row, Button, Image } from "antd";

import { Afterloginsidenav } from "../../../Other Components/Afterloginsidenav/Afterloginsidenav";
import Sider from "antd/lib/layout/Sider";
import "./Myprofile.css";
import { Link, useLocation } from "react-router-dom";
const { Footer, Content } = Layout;

export const Myprofile = () => {
  return (
    <div>
      <Layout>
        <Afterloginsidenav text="My profile" />

        <Layout>
          <Content
            style={{
              margin: "16px",
              paddingLeft: "180px",

              paddingTop: "100px",
              height: "92vh"
            }}
          >
            <div
              classnName=""
              style={{
                backgroundColor: "#F6F6F6",
                height: "500px",
                width: "1300px",
                borderRadius: "10px",
                marginTop: "-30px"
              }}
            ></div>
            <Col className="inputForm" style={{ marginTop: "-167px" }}>
              <div style={{ width: "466px", marginLeft: "50px" }}>
                <Input className="inputAnt" placeholder="Full Name" />
              </div>
            </Col>
            <div
              style={{
                height: "200px",
                width: "400px",
                backgroundColor: "white",
                marginLeft: "800px",
                marginTop: "-250px",
                borderRadius: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center"
              }}
            >
              <div>Password age:</div>
              <div>
                <Button
                  style={{
                    height: "40px",
                    width: "153px",
                    backgroundColor: "#505C8B",
                    borderRadius: "12px",
                    color: "white",
                    border: "none"
                  }}
                >
                  Change password
                </Button>
              </div>
            </div>
            <Link to="/Editprofile">
              <Button
                type="primary"
                style={{
                  Size: "14px",
                  fontFamily: "Prompt",
                  backgroundColor: "#FFB8B1",
                  fontWeight: "500",
                  borderRadius: "10px",
                  border: "0px",
                  width: "160px",
                  height: "40px",
                  color: "black",
                  top: "20px",
                  position: "relative",
                  left: "40%",
                  marginTop: "7%"
                }}
              >
                Edit Profile
              </Button>
            </Link>
            <Link to="/home">
              <Button
                type="primary"
                style={{
                  Size: "14px",
                  fontFamily: "Prompt",
                  backgroundColor: "#FFB8B1",
                  fontWeight: "500",
                  borderRadius: "10px",
                  border: "0px",
                  width: "160px",
                  height: "40px",
                  color: "black",
                  top: "20px",
                  position: "relative",
                  left: "40%",
                  marginTop: "7%"
                }}
              >
                Go back
              </Button>
            </Link>
          </Content>

          
        </Layout>
      </Layout>
    </div>
  );
};
