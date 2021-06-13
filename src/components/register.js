import React, { useState } from "react";
import auth from "../resources/auth";           
import userResources from '../resources/users';

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    await auth.register(username, password);
    const user = await userResources.currentUser();
    props.dispatchUser(user);
  }

  return (
    <div>
      <h1>Register</h1>
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
      <button onClick={register}>Submit</button>
    </div>
  );
};
