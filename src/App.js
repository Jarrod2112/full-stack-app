import React, { useState, useEffect } from "react";
import "./App.css";

import { Navigation } from './components/navigation';
import { Login } from "./components/login";
import { Register } from "./components/register";
import userResources from "./resources/users";
import { List } from "./components/posts/list";
import postResources from "./resources/post";
function App() {
  // 1. a place to store the logged in user
  // 2. if there is no logged in user, show the register/login form
  // 3. if there is a logged in user, show the app
  const [user, setUser] = useState(null);

  // use this to fetch the current logged in user when the app starts up
  useEffect(() => {
    userResources
      .currentUser()
      .then((currentUser) => {
        setUser(currentUser);
      })
      .catch();
  }, []);

  return (
    <div className="App">
      {user ? (
        <>
          <Navigation username={user.username} />
          <List dispatchList={allPost.list} />
        </>
      ) : (
        <>
          <Register dispatchUser={setUser} />
          <Login dispatchUser={setUser} />
        </>
      )}
    </div>
  );
}

export default App;
