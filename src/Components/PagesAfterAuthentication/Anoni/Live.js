import React, { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import FileSaver from "file-saver";
import { getRandomInt } from "./Getrandomint";
import Button from "react-bootstrap/Button";

import Form from "react-bootstrap/Form";

export const Live = (props) => {
  const [debugCount, setDebugCount] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [copySession, setcopySession] = useState(
    `https://app.pluma.in/view/${props.pid}`
  );
  const [copiedbox, setcopiedbox] = useState(false);
  const [Loader, setLoader] = useState(false);

  const dataFetchedRef = useRef(false);

  function capture(startTime, video, webSocket) {
    const canvas = document.getElementById("capture-canvas");
    if (canvas === null) {
      console.log("STOPPED STREAMING");
      return;
    }
    canvas.getContext("2d").drawImage(video, 0, 0);
    canvas.toBlob(async function (blob) {
      let timestamp = Date.now() - startTime;
      console.log("Sending @", timestamp);
      webSocket.send(JSON.stringify({ timestamp: timestamp }));
      webSocket.send(blob);
    }, "image/jpeg");
  }

  function debugCapture(debugImages) {
    console.log("running debugCapture");
    const video = document.getElementById("video");
    const debugCanvas = document.getElementById("debug-canvas");
    if (debugCanvas === null) {
      return;
    }
    debugCanvas
      .getContext("2d")
      .drawImage(
        video,
        getRandomInt(video.width - 400),
        getRandomInt(video.height - 400),
        400,
        400,
        0,
        0,
        400,
        400
      );
    debugCanvas.toBlob(async function (blob) {
      debugImages.push(blob);
      setDebugCount(debugImages.length);
    }, "image/jpeg");
  }

  function downloadZip(debugImages) {
    const zip = new JSZip();
    var index = 0;
    debugImages.forEach((blob) => {
      zip.file(index + ".jpeg", blob);
      index += 1;
    });
    zip.generateAsync({ type: "blob" }).then(
      (blob) => {
        FileSaver.saveAs(blob, `${props.pid}.zip`);
      },
      (err) => console.log(err)
    );
  }

  function tick(startTime) {
    setSecondsElapsed((Date.now() - startTime) / 1000);
  }

  useEffect(() => {
    const video = document.getElementById("video");
    const canvas = document.getElementById("capture-canvas");
    const startTime = Date.now();
    canvas.width = video.width;
    canvas.height = video.height;

    if (dataFetchedRef.current) {
      onclickpresenttime();
    }
    dataFetchedRef.current = true;

    const webSocket = new WebSocket(
      `wss://app.pluma.in/api/presentation/${props.pid}/publish/${props.publishKey}`
    );
    // Read Ack before sending next frame
    webSocket.addEventListener("message", (event) => {
      //   // If anything other than ok, stop.
      if (event.data == "ok") {
        capture(startTime, video, webSocket);
        console.log("connection again");
      }
    });
    // Start capture
    // eslint-disable-next-line no-unused-vars
    webSocket.addEventListener("open", (event) => {
      capture(startTime, video, webSocket);
      console.log("connection first");
    });

    // Session clock

    const timerInterval = setInterval(() => tick(startTime), 1000);

    // Capture for debug
    // const debugImages = [];
    // const debugInterval = setInterval(() => debugCapture(debugImages), 30000);
    // document
    //   .getElementById("debugDownload")
    //   .addEventListener("click", () => downloadZip(debugImages));

    // Cleanup
    return () => {
      // clearInterval(debugInterval);
      clearInterval(timerInterval);
      webSocket.close();
    };
  }, []);

  function timeElapsed() {
    const hh = String(Math.floor(secondsElapsed / 3600)).padStart(2, "0");
    const mm = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(
      2,
      "0"
    );
    const ss = String(Math.floor(secondsElapsed % 60)).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  }

  function onclickpresenttime() {
    const obj1 = new Date().toLocaleDateString("en-us", {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric"
    });
    const obj2 = new Date().toLocaleTimeString();
    const obj = { obj1, obj2 };
    const ele = document.getElementById("starttime");
    ele.innerHTML += `<div>Start Time : ${obj.obj1}</div><div>${obj.obj2}<div>`;
  }

  return (
    <>
      <div
        className="k"
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          // border:"2px solid black",
          backgroundColor: "#EFEFEF",
          width: "100%",
          height: "25%",
          borderRadius: "1.2rem"
        }}
      >
        {true ? (
          <>
            <div
              className="my-1"
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start"
              }}
            >
              <div>
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    width: "46.3rem",
                    height: "2.9rem",
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
                  Please share the following results with students/ participents
                  so that they can start viewing your whiteboard
                </div>

                <div
                  style={{
                    height: "1.5rem",
                    width: "1.5rem",
                    backgroundColor: "#FFFFFF",
                    transform: "rotate(45deg)",
                    marginLeft: "4rem"
                  }}
                ></div>
              </div>
            </div>
          </>
        ) : (
          <div></div>
        )}

        <div
          style={{
            // border:"2px solid black",backgroundColor:"red",
            display: "flex"
          }}
        >
          {/* <Link href={`/view/${props.pid}`}> */}
          <Form.Control
            className="mx-1"
            style={{
              height: "2.3rem",
              borderRadius: "0.5rem",
              width: "87rem",
              lineHeight: "0.5rem",
              fontSize: "0.8rem"
            }}
            required
            type="text"
            value={copySession}
          />
          {/* <a target="_blank">Link: https://app.pluma.in/view/{props.pid}</a> */}
          {/* </Link> */}

          <div>
            <Button
              className="mx-4"
              onClick={() => {
                setcopiedbox(true);
                navigator.clipboard.writeText(copySession);
                setTimeout(() => {
                  setcopiedbox(false);
                }, 1500);
              }}
              style={{ height: "2.3rem", borderRadius: "0.5rem" }}
            >
              copy
            </Button>
            <div
              style={{
                position: "absolute",
                top: "0rem",
                right: "3rem",
                zIndex: "1"
              }}
            >
              {copiedbox ? (
                <div
                  style={{
                    backgroundColor: "#94AAFF",
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: "14rem",
                    height: "3rem",
                    color: "#FFFFFF",
                    borderRadius: "1rem",
                    boxShadow: "0px 4px 7px 0px black"
                  }}
                >
                  <div> URL copied</div>
                </div>
              ) : (
                <div style={{ width: "11rem", height: "3rem" }}></div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-2"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          // border:"2px solid black",

          backgroundColor: "#3D3D3D",

          borderRadius: "1.2rem",
          width: "100%",
          height: "70%"
        }}
      >
        <canvas
          id="preview"
          className="border"
          width="650"
          height="350"
        ></canvas>

        <canvas id="debug-canvas" height="400" width="400" hidden></canvas>
        <canvas id="capture-canvas" hidden></canvas>
        <div style={{ marginRight: "6rem", marginLeft: "8rem" }}>
          <h3 className="text-white">{timeElapsed()}</h3>
          <h5
            id="starttime"
            className="text-white"
            style={{
              height: "4rem",
              width: "22rem",
              fontSize: "1rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          ></h5>

          <Button
            onClick={() => {
              window.location.reload();
            }}
          >
            Stop
          </Button>
          <button id="debugDownload" className="btn btn-danger">
            Download ({debugCount})
          </button>
        </div>
      </div>
    </>
  );
};
