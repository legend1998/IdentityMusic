import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Panel from "./Panel";
function App() {
  return (
    <div className="App  font-graphik ">
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/panel">
            <Panel />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
