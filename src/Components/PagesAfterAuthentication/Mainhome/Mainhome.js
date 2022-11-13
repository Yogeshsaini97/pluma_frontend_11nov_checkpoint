import { Layout } from "antd";
import React from "react";

import { Afterloginsidenav } from "../../../Other Components/Afterloginsidenav/Afterloginsidenav";
import Sider from "antd/lib/layout/Sider";
import "./Mainhome.css";
import { Link, useLocation } from "react-router-dom";
const { Footer, Content } = Layout;

export const Mainhome = () => {
  return (
    <div>
      <Layout>
        <Afterloginsidenav text="Hi jane. Welcome!" />
        <Layout>
          <Content
            style={{
              margin: "16px",
              paddingLeft: "180px",

              paddingTop: "80px",
              height: "92vh"
            }}
          >
            <div style={{ position: "absolute", top: "100px" }}>
              i should be camera
            </div>
            <div
              classname=""
              style={{
                backgroundColor: "#F6F6F6",
                height: "500px",
                width: "1300px",
                borderRadius: "10px",
                marginTop: "-10px"
              }}
            ></div>
          </Content>
        
        </Layout>
      </Layout>
    </div>
  );
};
