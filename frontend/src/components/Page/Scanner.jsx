import React, { useState, useRef, useEffect } from 'react';
import CenterFocusStrongIcon from '@mui/icons-material/CenterFocusStrong';
import { useNavigate } from "react-router-dom"; 

const Scanner = () => {
  const [capturedImage, setCapturedImage] = useState(null);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);


const navigate = useNavigate();

const navigateToMap = () => {
  navigate("/Map");
};

const navigateToResult = () => {
  console.log("Data type of capturedImage: ", typeof capturedImage); // Will log "string"
  navigate("/Result", { state: { capturedImage }});
};

const navigateToSetting = () => {
  navigate("/Setting");
};

const handleLocalImage = (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
          setCapturedImage(reader.result);
      };
      reader.readAsDataURL(file);
  }
};

  useEffect(() => {
    startCamera(); // Start the camera as soon as the component renders

    // Clean up by stopping the camera when the component unmounts
    return () => {
      stopCamera();
      //console.log('Component unmounted. Camera stopped.');
    };
  }, []);

  const startCamera = async () => {
    try {
      //console.log("Starting camera");
      const newStream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        setStream(newStream);
      } else {
        console.error('Video element not initialized.');
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };
  

  // const stopCamera = () => {
  //   console.log("Stopping camera");
  //   console.log(stream);
  //   if (stream) {
  //     const video = document.querySelector('video');

  //   // A video's MediaStream object is available through its srcObject attribute
  //   const mediaStream = video.srcObject;

  //   // Through the MediaStream, you can get the MediaStreamTracks with getTracks():
  //   const tracks = mediaStream.getTracks();

  //   // Tracks are returned as an array, so if you know you only have one, you can stop it with: 
  //   tracks[0].stop();

  //   // Or stop all like so:
  //   tracks.forEach(track => track.stop())
  //   // setStream(mediaStream);
  //   } 
  //   else {
  //     console.log("No stream to stop");
  //   }
  //   console.log(stream);
  // };

  const stopCamera = () => {
    
    console.log(stream);
    if (stream) {
      console.log("Stopping camera");
      const tracks = stream.getTracks();
  
      // Stop all tracks in the stream
      tracks.forEach(track => track.stop());
  
      // Optionally, you can set the srcObject to null
      videoRef.current.srcObject = null;
  
      // Set the stream state to null
      setStream(null);
    } else {
      //console.log("No stream to stop");
    }
    //console.log(stream); // This will show null after stopping
  };

  const captureImage = async() => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0);
    const imageDataURL = canvas.toDataURL('image/png');
    setCapturedImage(imageDataURL);
    stopCamera(); // Stop the camera after capturing

    // // Send the captured image to the Flask API for prediction
    // try {
    //   const response = await fetch('http://127.0.0.1:5000/process_image', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json', 
    //     },
    //     body: JSON.stringify({ image: imageDataURL }),
    //   });

    //   if (response.ok) {
    //     navigate('/result'); // Navigate to the result page
    //   } else {
    //     console.error('Failed to send image for prediction.');
    //   }
    // } catch (error) {
    //   console.error('Error:', error);
    // }
  };

  const retakeImage = () => {
    setCapturedImage(null);
    startCamera(); // Start the camera again when retaking
  };
  

  return (
    <div className="Header">
        <h1>SCANNER</h1>
        <div className="App">
            {capturedImage ? (
                <div className="camera-container">
                    <img src={capturedImage} alt="Captured" className="camera-container" style={{  width: '70%', height: '70%', transform: 'scaleX(1)' }} />
                    <button onClick={retakeImage} className="retake-button">
                        Retake
                    </button>
                </div>
            ) : (
                <div className="camera-container">
                    <video ref={videoRef} autoPlay playsInline style={{width: '80%', height: '80%', transform: 'scaleX(1)' }} />
                    <div className="button-container">
                        <button className="capture-button" onClick={captureImage}>
                            <CenterFocusStrongIcon style={{ color: '#fff', fontSize: 40 }} />
                        </button>


                    </div>
                </div>
            )}
            <div className="scanner-button-container">
                <div>
                    <button className="map-button" onClick={navigateToMap}>Map</button>
                    <button className="result-button" onClick={navigateToResult}>Results</button>
                    <button className="settings-button" onClick={navigateToSetting}>Settings</button>
                    {/* Local Image Selection */}
                    <input
                            type="file"
                            accept="image/*"
                            onChange={handleLocalImage}
                            style={{ display: 'none' }}
                            id="local-image-input"
                        />
                        <label htmlFor="local-image-input" className="map-button">
                            Select Image Locally
                        </label>
                </div>
            </div>
        </div>
    </div>
);

};

export default Scanner;
