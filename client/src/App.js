import React, { useState } from "react";
import './App.css';
import Axios from "axios";

function App() {
  const [registerUername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginUername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [data, setData] = useState(null);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
