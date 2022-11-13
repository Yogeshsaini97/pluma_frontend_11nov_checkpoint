import React from "react";

export const Startsession = () => {
  return (
    <div
      className="my-1"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          backgroundColor: "#FFFFFF",
          width: "30.3rem",
          height: "3.5rem",
          borderRadius: "1.2rem",
          color: "#161616",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "0.8rem",
          fontFamily: "prompt",
          fontWeight: "500",
          lineHeight: "2.117rem",
          position: "relative",
          top: "1rem",
          boxShadow: "0px 4px 7px 0px black",
          zIndex: "0"
        }}
      >
        Enter and click on the start session button to start a new session
      </div>

      <div
        style={{
          height: "1.5rem",
          width: "1.5rem",
          backgroundColor: "#FFFFFF",
          transform: "rotate(45deg)"
        }}
      ></div>
    </div>
  );
};
