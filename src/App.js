import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Panel from "./Panel";
import Signup from "./Signup";
import "./app.css";

import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="App font-graphik  ">
      <Router>
        <Switch>
          <Route path="/signup">
            <Signup />
          </Route>
          {user ? (
            <Route path="/panel">
              <Panel />
            </Route>
          ) : null}
          <Route path="/">
            <Login />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
