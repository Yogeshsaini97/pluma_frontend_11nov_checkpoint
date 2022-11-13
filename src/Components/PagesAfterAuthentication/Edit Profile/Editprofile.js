import { Layout } from "antd";
import React from "react";
import { Col, Input, Button } from "antd";

import { Afterloginsidenav } from "../../../Other Components/Afterloginsidenav/Afterloginsidenav";

import "./Editprofile.css";
const { Footer, Content } = Layout;

export const Editprofile = () => {
  return (
    <div>
      <Layout>
        <Afterloginsidenav text="Edit Profile" />
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
              classname=""
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
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};
