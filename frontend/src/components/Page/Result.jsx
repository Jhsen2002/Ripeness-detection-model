import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const Result = () => {
  const [apiData, setApiData] = React.useState([]);
  const location = useLocation();
  const { capturedImage } = location.state || {};
  const model = localStorage.getItem('selectedModel');
  const [processedImageURL, setProcessedImageURL] = useState(null);
  
  const [predictions, setPredictions] = React.useState([
    {
      x: 254.5,
      y: 188.0,
      width: 233.0,
      height: 194.0,
      confidence: 0.9573491215705872,
      class: "3",
      class_id: 3,
      image_path: "frame9kombinasi--3-_png.rf.dc0d499c9ff5e0c98109856016b1cabf.jpg",
      prediction_type: "ObjectDetectionModel",
    }
  ]);
  const [editingPredictionIndex, setEditingPredictionIndex] = useState(-1);

  React.useEffect(() => {
    if (capturedImage) {
      processImage(capturedImage);
    }
  }, [capturedImage]);

  const processImage = async (dataURL) => {
    try {
      const response = await uploadImage(dataURL);
      setProcessedImageURL(response);
    } catch (error) {
      console.error("Error processing image:", error);
    }
  };
  const uploadImage = async (dataURL) => {
    const formData = new FormData();
    
    // Convert the dataURL to a File object, similar to your second code
    const responseToBlob = await fetch(dataURL);
    const imageBlob = await responseToBlob.blob();
    const file = new File([imageBlob], "captured-image.png", { type: "image/png" });
    console.log(model)
    formData.append('image', file);
    let apiUrl = 'http://127.0.0.1:5000/process_image_yolov8';
    if (model === 'Detectron2') {
      apiUrl = 'http://127.0.0.1:5000/process_image_detectron2';
    } else if (model === 'Roboflow_yolo') {
      apiUrl = 'http://127.0.0.1:5000/process_image_roboflow';
    }
    const uploadResponse = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
    });
  
    if (!uploadResponse.ok) {
      throw new Error('Network response was not ok');
    }
  
    const processedBlob = await uploadResponse.blob();
    const imageURL = URL.createObjectURL(processedBlob);
    return imageURL;
  };  
  const handleEditClick = (index) => {
    // console.log("Editing");
    setEditingPredictionIndex(index);
  };

  const handleSaveEdit = (index) => {
    setPredictions((prevPredictions) =>
      prevPredictions.map((prediction, i) =>
        i === index ? { ...prediction } : prediction
      )
    );
    setEditingPredictionIndex(-1);
  };

  const renderPredictionCards = () => {
    return predictions.map((prediction, index) => (
      <Card key={index} className="prediction-card" style={{backgroundColor: "grey"}}>
        <CardContent>
          {editingPredictionIndex === index ? (
            <div>
              Edit Class:{" "}
              <input
                className="class-input"
                type="text"
                value={prediction.class}
                onChange={(e) => {
                  console.log("Editing the class");
                  setPredictions((prevPredictions) =>
                    prevPredictions.map((prevPrediction, i) =>
                      i === index
                        ? { ...prevPrediction, class: e.target.value }
                        : prevPrediction
                    )
                  );
                }}
              />
              <div>
                Edit Confidence:{" "}
                <input
                  type="text"
                  className="confidence-input"
                  value={prediction.confidence}
                  onChange={(e) => {
                    console.log("Editing the confidence");
                    setPredictions((prevPredictions) =>
                      prevPredictions.map((prevPrediction, i) =>
                        i === index
                          ? { ...prevPrediction, confidence: e.target.value }
                          : prevPrediction
                      )
                    );
                  }}
                />
              </div>
              <button className="edit-button" onClick={() => handleSaveEdit(index)}>Save Edit</button>
            </div>
          ) : (
            <div display-predictions>
              <div className="predictions-text">Class: {prediction.class}</div>
              <div className="predictions-text">Confidence: {prediction.confidence}</div>
              <button className="predictions-button" onClick={() => handleEditClick(index)}>Edit</button>
            </div>
          )}
        </CardContent>
      </Card>
    ));
  };

  return (
    <div className="result-container">
      <h1>RESULT</h1>
      <div className="back-button-container"> 
        <button className="back-button" onClick={() => window.history.back()}>
          <ArrowBackIcon style={{fontSize: 40 }} /></button>
      </div>
      <div className="image-container">
        <h2>Image</h2>
        {capturedImage && (
          <img src={capturedImage} alt="Captured" className="captured-image" style={{ width: '80%', height: 'auto', transform: 'scaleX(1)' }} />
        )}
      </div>
      <div className="image-container">
        <h2>Result</h2>
        {processedImageURL && (
          <img src={processedImageURL} alt="Processed" className="captured-image" style={{ width: '80%', height: 'auto', transform: 'scaleX(1)', marginTop: '20px' }} />
        )}
      </div>
      <div className="prediction-cards">
        {renderPredictionCards()}
      </div>
    </div>
  );
};

export default Result;

