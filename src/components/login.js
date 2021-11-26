import React, { useState } from "react";
import auth from "../resources/auth";
import userResources from '../resources/users';
import { Link, useHistory } from "react-router-dom";

export const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function login() {
    await auth.login(username, password);
    const user = await userResources.currentUser();
    props.dispatchUser(user);
    history.push('/');
  }

  return (
    <div>
      <div className="container m-2 justify-content-center mb-1">
        <div className="row">
          <div className="col-sm-5"></div>
          <div className="col-sm-5">
            <div class="p-3 bg-dark text-white m-2">
              <h1>Log in</h1>
              <input
                className="form-control"
                placeholder="username"
                type="text"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="form-control mt-2"
                placeholder="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-success btn-sm mt-2 nav-link active" onClick={login}>Submit</button>
            </div>
            <h5>Create a new account</h5>
            <Link to="/register" className="nav-link active">Register</Link>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
