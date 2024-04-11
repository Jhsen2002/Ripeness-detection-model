import React, { useState } from "react"; 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from "react-router-dom"; 

const Setting = () => { 
  const storedModel = localStorage.getItem('selectedModel');
  const [selectedModel, setSelectedModel] = useState(storedModel || 'YOLOv8');

  const handleModelSelect = (model) => {
    setSelectedModel(model);
    localStorage.setItem('selectedModel', model);
  };

  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate("/", { state: { model: selectedModel } });
  }

  return (
    <div className="setting-container">
      <h1>SETTINGS</h1>
      <div className="back-button-container"> 
        <button className="back-button" onClick={() => window.history.back()}>
          <ArrowBackIcon style={{fontSize: 40 }} /></button>
      </div>
      <Card className="model-card" style={{backgroundColor: "grey"}}>
        <CardContent className="model-card-content">
          <div className="model-card-header">
            <h3>Choose ML Model</h3>
          </div>
          <div className="model-card-item">
            <div className="model-label">Available Models:</div>
            <div>
              <button 
                className="model-button" 
                style={{backgroundColor: selectedModel === 'YOLOv8' ? 'blue' : ''}}
                onClick={() => handleModelSelect('YOLOv8')}>YOLOv8
              </button>
            </div>
            <div>
              <button 
                className="model-button" 
                style={{backgroundColor: selectedModel === 'Detectron2' ? 'blue' : ''}}
                onClick={() => handleModelSelect('Detectron2')}>Detectron2
              </button>
            </div>
            <div>
              <button 
                className="model-button" 
                style={{backgroundColor: selectedModel === 'Roboflow_yolo' ? 'blue' : ''}}
                onClick={() => handleModelSelect('Roboflow_yolo')}>Yolov8 roboflow
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="sign-out">
        <button className="sign-out-button" onClick={handleSignOut}>Sign Out</button>
      </div>
    </div>
  );
};
  
export default Setting;
