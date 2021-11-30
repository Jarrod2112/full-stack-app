import React, { useState, useEffect } from "react";
import "./App.css";
import { Navigation } from "./components/navigation";
import { Login } from "./components/login";
import { Register } from "./components/register";
import userResources from "./resources/users";
import { List } from "./components/posts/list";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Profile } from "./components/posts/profile";
import { SearchResults } from "./components/SearchResults";
import { PendingFriendRequests } from "./components/PendingFriendRequests";
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
          <Router>
            <Navigation username={user.username} dispatchUser={setUser} />
            <Switch>
              <Route path="/" exact component={List} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/search/:searchTerm" component={SearchResults} />
              <Route path="/friend-requests" component={PendingFriendRequests} />
            </Switch>
          </Router>
        </>
      ) : (
        <>
          <Router>
            <Switch>
              <Route path="/register" exact>
                <Register dispatchUser={setUser} />
              </Route>
              <Route path={["/", "/login"]}>
                <Login dispatchUser={setUser} />
              </Route>
            </Switch>
          </Router>
        </>
      )}
    </div>
  );
}

export default App;
