import React from "react";
import "./Loading.css";

export const Loading = () => {
  return (
    <div
      style={{ marginTop: "12rem" }}
      className="d-flex justify-content-center"
    >
      <img
        src="/assets/images/spinnerpurple.gif"
        className="img-fluid"
        alt="loading"
      ></img>
    </div>
  );
};
