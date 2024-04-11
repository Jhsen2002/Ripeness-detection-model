// import logo from './logo.svg';
import './App.css';
import React from 'react';
import Login from './components/Page/Login';
import Scanner from './components/Page/Scanner';
import Result from './components/Page/Result';
import Test from './components/Page/Test';
import Map from './components/Page/Map';
import Setting from './components/Page/Setting';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


const App = () => {

  return (
    <div className="App">
       <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Scanner" element={<Scanner />} />
          <Route path="/result" element={<Result />} />
          <Route path="/test" element={<Test />} />
          <Route path="/Map" element={<Map />} />
          <Route path="/Setting" element={<Setting />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
