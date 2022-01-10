import React, { useState } from "react";
import auth from "../resources/auth";
import userResources from "../resources/users";
import { Link, useHistory } from "react-router-dom";

export const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  async function register() {
    await auth.register(username, password);
    const user = await userResources.currentUser();
    props.dispatchUser(user);
    history.push('/');
  }

  return (
    <div class="input-group mb-1">
      <div className="container m-2 mt-2 justify-content-center mb-1">
        <div className="row">
          <div className="col-sm-5"></div>
          <div className="col-sm-5">
            <div className="p-3 bg-dark text-white m-2">
              <h1>Register</h1>
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
              <button className="btn btn-success btn-sm mt-2" onClick={register}>Submit</button>
            </div>
            <h5>Already have an account?</h5>
            <Link to="/login" className="nav-link active">Login</Link>
          </div>
        </div>
        <div className="col"></div>
      </div>
    </div>
  );
};
