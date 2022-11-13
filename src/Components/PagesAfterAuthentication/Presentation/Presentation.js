import React, { useState, useEffect } from 'react';
import { fabric } from 'fabric';
import { fetchApi } from './utils.js';
import Link from 'next/link';
import JSZip from 'jszip';
import FileSaver from 'file-saver';



function getRandomInt(max) 
{
  return Math.floor(Math.random() * max);
}




///////////////////

function Start(props) {
  return (
    <>
      <h5 className="info-text">
        Set name of presentation
      </h5>
      <div className="row justify-content-center mt-5">
        <div className="col-sm-5">
          <div className="input-group">
            <div className="input-group-prepend">
              <div className="input-group-text">
                <i className="tim-icons icon-caps-small"></i>
              </div>
            </div>
            <input className="form-control" type="text"
                   placeholder={props.presentationName}
                   onChange={props.onChange}
                   
                   />
          </div>
        </div>
      </div>
    </>
  );
}



















/////////////////////////////



function Calibrate(props) {
  const CORNER_LENGTH = 30;

  // eslint-disable-next-line no-unused-vars
  function handlePlay(event) {
    const canvas = new fabric.Canvas("preview");

    // Add video to the canvas
    const video = document.getElementById("video");
    const img = new fabric.Image(video, {
      left: 0,
      top: 0,
      originX: 0,
      originY: 0,
      scaleX: props.width / video.width,
      scaleY: props.height / video.height,
      objectCaching: false,
      selectable: false
    });
    canvas.add(img);

    // The selected area is represented by a polygon
    const selectedArea = new fabric.Polygon(
      [props.corners['NW'], props.corners['NE'], props.corners['SE'], props.corners['SW']],
      {
        fill: 'blue',
        opacity: 0.1,
        selectable: false
      }
    );
    canvas.add(selectedArea);

    // The controls for the polygon
    let half_length = CORNER_LENGTH / 2;
    [[0, 'NW'], [1, 'NE'], [2, 'SE'], [3, 'SW']].forEach(([pos, key]) => {
      let x = props.corners[key].x;
      let y = props.corners[key].y;
      props.onCornerChange(key, x, y);
      let corner = new fabric.Rect({
        left: x - half_length,
        top: y - half_length,
        fill: 'red',
        width: CORNER_LENGTH,
        height: CORNER_LENGTH,
        hasControls: false
      });

      // update the selected area on moving the corner
      corner.on('moving', function(options) {
        selectedArea.points[pos] = {
          x: options.transform.target.left + half_length,
          y: options.transform.target.top + half_length
        };
        selectedArea.dirty = true;
        props.onCornerChange(key,
                             selectedArea.points[pos].x,
                       selectedArea.points[pos].y);
      });
      canvas.add(corner);
    });

    // render loop
    fabric.util.requestAnimFrame(function render() {
      canvas.renderAll();
      fabric.util.requestAnimFrame(render);
    });
  }

  //////////////////////

  // fetch the camera and start video
  useEffect(() => {
    async function fetchCamera() {
      const cameraStream = await navigator.mediaDevices.getUserMedia({
        // prefer rear camera on phones
        video: {
          facingMode: "environment",
          width: {ideal: 1280},
          height: {ideal: 720}
        },
        audio: false
      });
      const settings = cameraStream.getVideoTracks()[0].getSettings();
      const video = document.getElementById("video");
      video.height = settings.height;
      video.width = settings.width;
      video.srcObject = cameraStream;
      props.onCameraChange(settings.width, settings.height);
      video.addEventListener('play', handlePlay);
    }
    fetchCamera();
  }, []);

  return (
    <>
      <h5 className="info-text">
        Mark the boundaries of your board
      </h5>
      <div className="row justify-content-center">
        <div className="col-sm-5 ml-auto mr-auto text-center">
          <canvas id="preview" className="border" width={props.width} height={props.height}></canvas>
        </div>
      </div>
    </>
  );
}





















//////////////////////

function Live(props) {
  const [debugCount, setDebugCount] = useState(0);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  function capture(startTime, video, webSocket) {
    const canvas = document.getElementById('capture-canvas');
    if (canvas === null) {
      console.log('STOPPED STREAMING');
      return;
    }
    canvas.getContext('2d').drawImage(video, 0, 0);
    canvas.toBlob(async function(blob) {
      let timestamp = Date.now() - startTime;
      console.log("Sending @", timestamp);
      webSocket.send(JSON.stringify({timestamp: timestamp}));
      webSocket.send(blob);
    }, 'image/jpeg');
  }

  function debugCapture(debugImages) {
    console.log('running debugCapture');
    const video = document.getElementById('video');
    const debugCanvas = document.getElementById('debug-canvas');
    if (debugCanvas === null) {
      return;
    }
    debugCanvas.getContext('2d').drawImage(
      video,
      getRandomInt(video.width - 400),
      getRandomInt(video.height - 400),
      400, 400, 0, 0, 400, 400);
    debugCanvas.toBlob(async function(blob) {
      debugImages.push(blob);
      setDebugCount(debugImages.length);
    }, 'image/jpeg');
  }

  function downloadZip(debugImages) {
    const zip = new JSZip();
    var index = 0;
    debugImages.forEach((blob) => {
      zip.file(index + ".jpeg", blob);
      index += 1;
    });
    zip.generateAsync({type: "blob"}).then((blob) => {
      FileSaver.saveAs(blob, `${props.pid}.zip`);
    }, (err) => console.log(err));
  }

  function tick(startTime) {
    setSecondsElapsed((Date.now() - startTime) / 1000);
  }

  useEffect(() => {
    const video = document.getElementById('video');
    const canvas = document.getElementById('capture-canvas');
    const startTime = Date.now();
    canvas.width = video.width;
    canvas.height = video.height;

    // const webSocket = new WebSocket(
    //   process.env.NEXT_PUBLIC_PUBLISH_WS +
    //     `/api/presentation/${props.pid}/publish/${props.publishKey}`
    // );
    // Read Ack before sending next frame
    // webSocket.addEventListener('message', (event) => {
    //   // If anything other than ok, stop.
    //   if (event.data == "ok") {
    //     capture(startTime, video, webSocket);
    //   }
    // });
    // Start capture
    // eslint-disable-next-line no-unused-vars
    // webSocket.addEventListener('open', (event) => {
    //   capture(startTime, video, webSocket);
    // });

    // Session clock
    const timerInterval = setInterval(() => tick(startTime), 1000);

    // Capture for debug
    const debugImages = [];
    const debugInterval = setInterval(() => debugCapture(debugImages), 30000);
    document.getElementById('debugDownload').addEventListener(
      'click',
      () => downloadZip(debugImages)
    );

    // Cleanup
    return () => {
      clearInterval(debugInterval);
      clearInterval(timerInterval);
      // webSocket.close();
    };
  }, []);

  function timeElapsed() {
    const hh = String(Math.floor(secondsElapsed / 3600)).padStart(2, '0');
    const mm = String(Math.floor((secondsElapsed % 3600) / 60)).padStart(2, '0');
    const ss = String(Math.floor(secondsElapsed % 60)).padStart(2, '0');
    return `${hh}:${mm}:${ss}`;
  }

  return (
    <>
      <h5 className="info-text">
        Live
      </h5>
      <div className="row justify-content-center mt-5">
        <div className="col-sm-5">
          <canvas id="debug-canvas" height="400" width="400" hidden></canvas>
          <canvas id="capture-canvas" hidden></canvas>
          <Link href={`/view/${props.pid}`}>
         
            <a target="_blank">Link: https://app.pluma.in/view/{props.pid}</a>
          </Link>
          <h3>{timeElapsed()}</h3>
          <button id="debugDownload" className="btn btn-danger">Download ({debugCount})</button>
        </div>
      </div>
    </>
  );
}






























////////////////////

export function Presentation() {
  const canvasHeight = 480;
  const canvasWidth = 640;
  const [ presentationName, setPresentationName ] = useState("New Presentation");
  const [cameraShape, setCameraShape] = useState([undefined, undefined]);
  const corners = {};
  // ['NW', 'NE', 'SE', 'SW'].forEach((key) => {corners[key] = useState(undefined)});   // change this to for loop
  const cornerArray=['NW', 'NE', 'SE', 'SW'];
  for(let i=0;i<cornerArray.length;i++)
  {
    corners[cornerArray[i]]=useState(undefined);
  }
  const [progressIndex, setProgressIndex] = useState(0);
  const [pid, setPid] = useState(undefined);
  const [publishKey, setPublishKey] = useState(undefined);

  function progressItems() {
    const names = ["Start", "Calibrate", "Live"];

    function checkpoint(index) {
      var className = "nav-link ";
      if (index < progressIndex) {
        className += " checked";
      }
      else if (index === progressIndex) {
        className += " active";
      }
      return (
        <li key={names[index]} className="nav-item" style={{width: "33.333%"}}>
          <a className={className} data-toggle="tab">
            <i className="tim-icons icon-single-02"></i>
            <p>{names[index]}</p>
          </a>
        </li>
      );
    }
    return [0,1,2].map(checkpoint);
  }

  function createPresentation() {
    console.log(presentationName + "  " + cameraShape +"  "+corners )
  //   fetchApi('/api/presentation', 'POST', {
  //     'name': presentationName,
  //     'camera_shape': cameraShape,
  //     'corners': Object.fromEntries(Object.entries(corners).map(([key, value]) => [key, value[0]]))
  //   }).then((response) => {
  //     if (!response.ok) {
	// throw new Error('Unable to create a presentation');
  //     }
  //     return response.json();
  //   }).then((data) => {
  //     setPid(data.id);
  //     setPublishKey(data.publish_key);
  //     setProgressIndex(2);
  //   });
    // setPid("NWmMEdzqyBzRTbk");
    //   setPublishKey("GzzRSObHfhyXZlm");
    //   setProgressIndex(2);
  }

  function goToNext() {
    if (progressIndex == 2) {
      window.location.reload();
    }
    else if (progressIndex == 1) {
      createPresentation();
    }
    else {
      // eslint-disable-next-line no-unused-vars
      setProgressIndex((state, props) => state + 1);
    }
  }

  function nextButton() {
    var name = "Next";
    if (progressIndex == 1) {
      name = "Go Live";
    }
    else if (progressIndex == 2) {
      name = "Stop";
    }

    return (
      <input type="button" className="btn btn-next btn-fill btn-primary btn-wd"
             value={name}
             onClick={goToNext}
      />
    );
  }

  function initialCorners() {
    const savedCorners = localStorage.getItem('corners');
    if (savedCorners === null) {
      return {
        'NW': {x: 20, y: 20},
        'NE': {x: canvasWidth - 20, y: 20},
        'SE': {x: canvasWidth - 20, y: canvasHeight - 20},
        'SW': {x: 20, y: canvasHeight - 20}
      };
    }
    else {
      return JSON.parse(savedCorners);
    }
  }

  return (
    <div className="row">
    <div className="col-md-10 ml-auto mr-auto">
    <div className="wizard-container">
      <div className="card card-wizard active" data-color="primary" id="wizardProfile">
        <div className="card-header text-center">
          <h3 className="card-title">
            {presentationName}
          </h3>
          <video id="video" autoPlay hidden></video>
          <div className="wizard-navigation">
            <div className="progress-with-circle">
              <div className="progress-bar" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="3"></div>
            </div>
            <ul className="nav nav-pills">
              {progressItems()}
            </ul>
          </div>
        </div>
	<div className="card-body">
    <div className="tab-content">
      {progressIndex === 0 &&
       <div className="tab-pane show active">
         <Start presentationName={presentationName}
                onChange={(e) => setPresentationName(e.target.value)}/>
       </div>}
      {progressIndex === 1 &&
       <div className="tab-pane show active">
         <Calibrate 
         width={640}
                    height={480}
                    corners={initialCorners()}
                    onCameraChange={(width, height) => setCameraShape([height, width])}
                    onCornerChange={(key, x, y) => corners[key][1]([x, y])}
         />
       </div>}
      {progressIndex === 2 &&
       <div className="tab-pane show active">
         <Live pid={pid} publishKey={publishKey}/>
       </div>}
    </div>
	</div>
	<div className="card-footer">
          <div className="pull-right">
            {nextButton()}
          </div>
          <div className="pull-left">
            <input type="button" className="btn btn-previous btn-fill btn-default btn-wd disabled"
                   name="previous" value="Previous"/>
          </div>
          <div className="clearfix"></div>
	</div>
      </div>
    </div>
    </div>
    </div>
  );
}
