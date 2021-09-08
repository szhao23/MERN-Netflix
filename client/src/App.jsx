import "./App.scss";
import Home from "./pages/Home/Home";
import Watch from "./pages/WatchFullScreen/Watch";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const App = () => {
  const user = true;

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> : <Redirect to="/register" />}
        </Route>
        <Route exact path="/register">
          {!user ? <Register /> : <Redirect to="/" />}
        </Route>
        <Route exact path="/login">
          {!user ? <Login /> : <Redirect to="/" />}
        </Route>
        {user && (
          <>
            <Route path="/movies">
              <Home type="movies" />
            </Route>
            <Route path="/series">
              <Home type="Series" />
            </Route>
            <Route path="/watch">
              <Watch />
            </Route>
          </>
        )}
      </Switch>
    </Router>
  );
};

export default App;
