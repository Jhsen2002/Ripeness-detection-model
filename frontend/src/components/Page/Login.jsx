import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import HttpsIcon from "@mui/icons-material/Https";
import CheckBox from "@mui/material/Checkbox";
import { green } from "@mui/material/colors";
import { FormControlLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isChecked1, setChecked1] = useState(false);
  const [isChecked2, setChecked2] = useState(false);
  const navigate = useNavigate();
  const DEFAULT_USERNAME = "admin";
  const DEFAULT_PASSWORD = "password123";

  const handleLogin = (e) => {
    e.preventDefault();
    allowLogin();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleCheckBox1 = (event) => {
    setChecked1(event.target.checked);
  };

  const handleCheckBox2 = (event) => {
    setChecked2(event.target.checked);
  };

  const allowLogin = () => {
    if (username === DEFAULT_USERNAME && password === DEFAULT_PASSWORD) {
      if (isChecked1 && isChecked2) {
        console.log("Login successful!", { username, password });
        navigate("/Scanner");
      } else {
        if (!isChecked1 && !isChecked2) {
          window.alert("Please agree to the terms and conditions and enable permissions to your camera, location, and notifications.");
        } else if (!isChecked1) {
          window.alert("Please agree to the terms and conditions.");
        } else {
          window.alert("Please enable permissions to your camera, location, and notifications.");
        }
      }
    } else {
      window.alert("Invalid username or password. Please try again.");
    }
  };

  return (
    <div>
      <img
        src="https://cdn4.iconfinder.com/data/icons/object-detection-technology/24/material_scan_reader_recognition_3D_object_detection-512.png"
        alt="Logo"
        border="0"
        className="logo"
      />
      <div class='login-outer'>
        <form action="" onSubmit={handleLogin}>
          <div className="input">
            <div className="input-icons">
              <span className="icon">
                <PersonIcon />
              </span>
              <input
                type="text"
                className="username"
                id="username"
                placeholder="USERNAME"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>

            <div className="input-icons">
              <span className="icon">
                <HttpsIcon />
              </span>
              <input
                type="password"
                className="password"
                id="password"
                placeholder="PASSWORD"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div className="checkbox-container">
            <div className="t&c1">
              <FormControlLabel
                control={
                  <CheckBox
                    checked={isChecked1}
                    onChange={handleCheckBox1}
                    sx={{
                      color: green[500],
                      "&.Mui-checked": {
                        color: green[500],
                      },
                    }}
                  />
                }
                label={
                  <div className="tc1-label">
                    I agree to the terms and conditions
                  </div>
                }
              />
            </div>
            <div className="t&c2">
              <FormControlLabel
                control={
                  <CheckBox
                    checked={isChecked2}
                    onChange={handleCheckBox2}
                    sx={{
                      color: green[500],
                      "&.Mui-checked": {
                        color: green[500],
                      },
                    }}
                  />
                }
                label={
                  <div className="tc2-label">
                    Allow the app to access camera, location <br /> and show notifications
                  </div>
                }
              />
            </div>
          </div>

          <button type="submit" className="login-button">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
