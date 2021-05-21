import React, { useState } from "react";
import auth from "../resources/auth";
import userResources from '../resources/users';

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function login() {
    await auth.login(username, password);
    const user = await userResources.currentUser();
    props.dispatchUser(user);
  }


  return (
    <div>
      <h1>Log in</h1>
      <input
        placeholder="username"
        type="text"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        placeholder="password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Submit</button>
    </div>
  );
};
