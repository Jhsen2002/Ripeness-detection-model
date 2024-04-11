import React, { useState } from 'react';
import axios from 'axios';

const Test = () => {
  const [file, setFile] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Data = reader.result.split(",")[1];

      try {
        const response = await axios({
          method: "POST",
          url: "https://detect.roboflow.com/ffb-grirs/2",
          params: {
            api_key: "uBVlxUNak02BPttzOXmW"
          },
          data: base64Data,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        });

        setResponseData(response.data);
      } catch (error) {
        console.error("Error processing image:", error.message);
      }
    };
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleSubmit}>Process Image</button>

      {responseData && <pre>{JSON.stringify(responseData, null, 2)}</pre>}
    </div>
  );
};

export default Test;