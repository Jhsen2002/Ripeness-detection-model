[1mdiff --git a/frontend/src/components/Page/Login.jsx b/frontend/src/components/Page/Login.jsx[m
[1mindex f892123..32d6352 100644[m
[1m--- a/frontend/src/components/Page/Login.jsx[m
[1m+++ b/frontend/src/components/Page/Login.jsx[m
[36m@@ -12,6 +12,8 @@[m [mconst Login = () => {[m
   const [isChecked1, setChecked1] = useState(false);[m
   const [isChecked2, setChecked2] = useState(false);[m
   const navigate = useNavigate();[m
[32m+[m[32m  const DEFAULT_USERNAME = "admin";[m
[32m+[m[32m  const DEFAULT_PASSWORD = "password123";[m
 [m
   const handleLogin = (e) => {[m
     e.preventDefault();[m
[36m@@ -35,18 +37,21 @@[m [mconst Login = () => {[m
   };[m
 [m
   const allowLogin = () => {[m
[31m-    if (isChecked1 && isChecked2) {[m
[31m-      const info = { username: username, password: password };[m
[31m-      console.log("Login successful!", info);[m
[31m-      navigate("/Scanner");[m
[31m-    } else {[m
[31m-      if (!isChecked1 && !isChecked2) {[m
[31m-        window.alert("Please agree to the terms and conditions and enable permissions to your camera, location, and notifications.");[m
[31m-      } else if (!isChecked1) {[m
[31m-        window.alert("Please agree to the terms and conditions.");[m
[32m+[m[32m    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {[m
[32m+[m[32m      if (isChecked1 && isChecked2) {[m
[32m+[m[32m        console.log("Login successful!", { username, password });[m
[32m+[m[32m        navigate("/Scanner");[m
       } else {[m
[31m-        window.alert("Please enable permissions to your camera, location, and notifications.");[m
[32m+[m[32m        if (!isChecked1 && !isChecked2) {[m
[32m+[m[32m          window.alert("Please agree to the terms and conditions and enable permissions to your camera, location, and notifications.");[m
[32m+[m[32m        } else if (!isChecked1) {[m
[32m+[m[32m          window.alert("Please agree to the terms and conditions.");[m
[32m+[m[32m        } else {[m
[32m+[m[32m          window.alert("Please enable permissions to your camera, location, and notifications.");[m
[32m+[m[32m        }[m
       }[m
[32m+[m[32m    } else {[m
[32m+[m[32m      window.alert("Invalid username or password. Please try again.");[m
     }[m
   };[m
 [m
[1mdiff --git a/frontend/src/components/Page/Result.jsx b/frontend/src/components/Page/Result.jsx[m
[1mindex 21e4196..e8c07f6 100644[m
[1m--- a/frontend/src/components/Page/Result.jsx[m
[1m+++ b/frontend/src/components/Page/Result.jsx[m
[36m@@ -8,7 +8,9 @@[m [mconst Result = () => {[m
   const [apiData, setApiData] = React.useState([]);[m
   const location = useLocation();[m
   const { capturedImage } = location.state || {};[m
[32m+[m[32m  const model = localStorage.getItem('selectedModel');[m
   const [processedImageURL, setProcessedImageURL] = useState(null);[m
[32m+[m[41m  [m
   const [predictions, setPredictions] = React.useState([[m
     {[m
       x: 254.5,[m
[36m@@ -45,10 +47,15 @@[m [mconst Result = () => {[m
     const responseToBlob = await fetch(dataURL);[m
     const imageBlob = await responseToBlob.blob();[m
     const file = new File([imageBlob], "captured-image.png", { type: "image/png" });[m
[31m-  [m
[32m+[m[32m    console.log(model)[m
     formData.append('image', file);[m
[31m-  [m
[31m-    const uploadResponse = await fetch('http://192.168.1.107:5000/process_image', {[m
[32m+[m[32m    let apiUrl = 'http://127.0.0.1:5000/process_image_yolov8';[m
[32m+[m[32m    if (model === 'Detectron2') {[m
[32m+[m[32m      apiUrl = 'http://127.0.0.1:5000/process_image_detectron2';[m
[32m+[m[32m    } else if (model === 'Roboflow_yolo') {[m
[32m+[m[32m      apiUrl = 'http://127.0.0.1:5000/process_image_roboflow';[m
[32m+[m[32m    }[m
[32m+[m[32m    const uploadResponse = await fetch(apiUrl, {[m
       method: 'POST',[m
       body: formData,[m
     });[m
[1mdiff --git a/frontend/src/components/Page/Scanner.jsx b/frontend/src/components/Page/Scanner.jsx[m
[1mindex cebc459..871f1ea 100644[m
[1m--- a/frontend/src/components/Page/Scanner.jsx[m
[1m+++ b/frontend/src/components/Page/Scanner.jsx[m
[36m@@ -15,6 +15,7 @@[m [mconst navigateToMap = () => {[m
 };[m
 [m
 const navigateToResult = () => {[m
[32m+[m[32m  console.log("Data type of capturedImage: ", typeof capturedImage); // Will log "string"[m
   navigate("/Result", { state: { capturedImage }});[m
 };[m
 [m
[36m@@ -39,13 +40,13 @@[m [mconst handleLocalImage = (event) => {[m
     // Clean up by stopping the camera when the component unmounts[m
     return () => {[m
       stopCamera();[m
[31m-      console.log('Component unmounted. Camera stopped.');[m
[32m+[m[32m      //console.log('Component unmounted. Camera stopped.');[m
     };[m
   }, []);[m
 [m
   const startCamera = async () => {[m
     try {[m
[31m-      console.log("Starting camera");[m
[32m+[m[32m      //console.log("Starting camera");[m
       const newStream = await navigator.mediaDevices.getUserMedia({ video: true });[m
       if (videoRef.current) {[m
         videoRef.current.srcObject = newStream;[m
[36m@@ -100,9 +101,9 @@[m [mconst handleLocalImage = (event) => {[m
       // Set the stream state to null[m
       setStream(null);[m
     } else {[m
[31m-      console.log("No stream to stop");[m
[32m+[m[32m      //console.log("No stream to stop");[m
     }[m
[31m-    console.log(stream); // This will show null after stopping[m
[32m+[m[32m    //console.log(stream); // This will show null after stopping[m
   };[m
 [m
   const captureImage = async() => {[m
[1mdiff --git a/frontend/src/components/Page/Setting.jsx b/frontend/src/components/Page/Setting.jsx[m
[1mindex b3b25cb..0ec9282 100644[m
[1m--- a/frontend/src/components/Page/Setting.jsx[m
[1m+++ b/frontend/src/components/Page/Setting.jsx[m
[36m@@ -1,43 +1,22 @@[m
[31m-import React from "react"; [m
[32m+[m[32mimport React, { useState } from "react";[m[41m [m
 import ArrowBackIcon from '@mui/icons-material/ArrowBack';[m
 import Card from '@mui/material/Card';[m
 import CardContent from '@mui/material/CardContent';[m
 import { useNavigate } from "react-router-dom"; [m
 [m
[31m-  [m
 const Setting = () => { [m
[32m+[m[32m  const storedModel = localStorage.getItem('selectedModel');[m
[32m+[m[32m  const [selectedModel, setSelectedModel] = useState(storedModel || 'YOLOv8');[m
 [m
[31m-  const renderModelCards = () => {[m
[31m-    return ([m
[31m-      <Card className="model-card" style={{backgroundColor: "grey"}}>[m
[31m-        <CardContent className="model-card-content">[m
[31m-          <div className="model-card-header">[m
[31m-            <h3>Choose ML Model</h3>[m
[31m-          </div>[m
[31m-          <div class="model-card-item">[m
[31m-            <div class="model-label">Available Models:</div>[m
[31m-            <div>[m
[31m-              <button className="model-button">YOLOv8</button>[m
[31m-            </div>[m
[31m-            <div>[m
[31m-              <button className="model-button">Detectron2</button>[m
[31m-            </div>[m
[31m-          </div>[m
[31m-        </CardContent>[m
[31m-      </Card>[m
[31m-    );[m
[31m-  }[m
[32m+[m[32m  const handleModelSelect = (model) => {[m
[32m+[m[32m    setSelectedModel(model);[m
[32m+[m[32m    localStorage.setItem('selectedModel', model);[m
[32m+[m[32m  };[m
 [m
   const navigate = useNavigate();[m
 [m
   const handleSignOut = () => {[m
[31m-    navigate("/");[m
[31m-  }[m
[31m-[m
[31m-  const renderSignOut = () => {[m
[31m-    return ([m
[31m-      <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>[m
[31m-    );[m
[32m+[m[32m    navigate("/", { state: { model: selectedModel } });[m
   }[m
 [m
   return ([m
[36m@@ -47,14 +26,42 @@[m [mconst Setting = () => {[m
         <button className="back-button" onClick={() => window.history.back()}>[m
           <ArrowBackIcon style={{fontSize: 40 }} /></button>[m
       </div>[m
[31m-      <div className="model-cards">[m
[31m-        {renderModelCards()}[m
[31m-      </div>[m
[32m+[m[32m      <Card className="model-card" style={{backgroundColor: "grey"}}>[m
[32m+[m[32m        <CardContent className="model-card-content">[m
[32m+[m[32m          <div className="model-card-header">[m
[32m+[m[32m            <h3>Choose ML Model</h3>[m
[32m+[m[32m          </div>[m
[32m+[m[32m          <div className="model-card-item">[m
[32m+[m[32m            <div className="model-label">Available Models:</div>[m
[32m+[m[32m            <div>[m
[32m+[m[32m              <button[m[41m [m
[32m+[m[32m                className="model-button"[m[41m [m
[32m+[m[32m                style={{backgroundColor: selectedModel === 'YOLOv8' ? 'blue' : ''}}[m
[32m+[m[32m                onClick={() => handleModelSelect('YOLOv8')}>YOLOv8[m
[32m+[m[32m              </button>[m
[32m+[m[32m            </div>[m
[32m+[m[32m            <div>[m
[32m+[m[32m              <button[m[41m [m
[32m+[m[32m                className="model-button"[m[41m [m
[32m+[m[32m                style={{backgroundColor: selectedModel === 'Detectron2' ? 'blue' : ''}}[m
[32m+[m[32m                onClick={() => handleModelSelect('Detectron2')}>Detectron2[m
[32m+[m[32m              </button>[m
[32m+[m[32m            </div>[m
[32m+[m[32m            <div>[m
[32m+[m[32m              <button[m[41m [m
[32m+[m[32m                className="model-button"[m[41m [m
[32m+[m[32m                style={{backgroundColor: selectedModel === 'Roboflow_yolo' ? 'blue' : ''}}[m
[32m+[m[32m                onClick={() => handleModelSelect('Roboflow_yolo')}>Yolov8 roboflow[m
[32m+[m[32m              </button>[m
[32m+[m[32m            </div>[m
[32m+[m[32m          </div>[m
[32m+[m[32m        </CardContent>[m
[32m+[m[32m      </Card>[m
       <div className="sign-out">[m
[31m-        {renderSignOut()}[m
[32m+[m[32m        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>[m
       </div>[m
     </div>[m
   );[m
 };[m
   [m
[31m-export default Setting;[m
\ No newline at end of file[m
[32m+[m[32mexport default Setting;[m
[1mdiff --git a/frontend/src/index.js b/frontend/src/index.js[m
[1mindex d563c0f..3f31261 100644[m
[1m--- a/frontend/src/index.js[m
[1m+++ b/frontend/src/index.js[m
[36m@@ -6,9 +6,9 @@[m [mimport reportWebVitals from './reportWebVitals';[m
 [m
 const root = ReactDOM.createRoot(document.getElementById('root'));[m
 root.render([m
[31m-  <React.StrictMode>[m
[32m+[m
     <App />[m
[31m-  </React.StrictMode>[m
[32m+[m
 );[m
 [m
 // If you want to start measuring performance in your app, pass a function[m
