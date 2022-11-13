import React from "react";
import { Link, useLocation } from "react-router-dom";
import Sider from "antd/lib/layout/Sider";

export const Sidermain = () => {
  const location = useLocation();
  const path = location.pathname;

  return (
    <Sider
      collapsed={true}
      className="my-5 sliders"
      style={{
        backgroundColor: "#505C8B",

        height: "35rem",
        width: "7rem",

        borderRadius: "1.2rem",

        marginLeft: "0rem"
      }}
    >
      {/* side nav bar for home page */}
      <Link to="/home">
        <div
          className="d-flex justify-content-center align-items-center navlink"
          style={{ width: "5.2rem", height: "6rem" }}
        >
          <div
            className={path === "/home" ? "borderwhite" : ""}
            style={{
              height: "5rem",
              width: "5rem",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              style={{ width: "3.0rem" }}
              src="/assets/SvgNav/VectorHome.svg"
              alt="error"
            />
          </div>
          {path === "/home" ? (
            <div>
              <img
                style={{
                  zIndex: "10",

                  marginLeft: "0rem",
                  width: "0.6rem",
                  height: "2rem"
                }}
                src="/assets/SvgNav/Vectorarrow.svg"
                alt="error"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
      {/* side nav bar for second list page */}

      <Link to="/list">
        <div
          className="d-flex justify-content-center align-items-center navlink mid"
          style={{
            width: "5.2rem",
            height: "6rem",
            marginTop: "8.5rem"
          }}
        >
          <div
            className={path === "/list" ? "borderwhite" : ""}
            style={{
              height: "5rem",
              width: "5rem",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              style={{ width: "2.5rem" }}
              src="/assets/SvgNav/VectorList.svg"
              alt="error"
            />
          </div>
          {path === "/list" ? (
            <div>
              <img
                style={{
                  zIndex: "10",

                  marginLeft: "0rem",
                  width: "0.6rem",
                  height: "2rem"
                }}
                src="/assets/SvgNav/Vectorarrow.svg"
                alt="error"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>

      {/* side nav bar for third faq page */}
      <Link to="/faq">
        <div
          className="d-flex justify-content-center align-items-center navlink "
          style={{
            width: "5.2rem",
            height: "6rem",
            marginTop: "8.5rem"
          }}
        >
          <div
            className={path === "/faq" ? "borderwhite" : ""}
            style={{
              height: "5rem",
              width: "5rem",
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              style={{ width: "2.0rem" }}
              src="/assets/SvgNav/Vectorquestionmark.svg"
              alt="error"
            />
          </div>
          {path === "/faq" ? (
            <div>
              <img
                style={{
                  zIndex: "10",

                  marginLeft: "0rem",
                  width: "0.6rem",
                  height: "2rem"
                }}
                src="/assets/SvgNav/Vectorarrow.svg"
                alt="error"
              />
            </div>
          ) : (
            ""
          )}
        </div>
      </Link>
    </Sider>
  );
};
