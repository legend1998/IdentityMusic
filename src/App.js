import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Panel from "./Panel";
import Signup from "./Signup";
import { useStateValue } from "./StateProvider";
function App() {
  const [{ user }, dispatch] = useStateValue();
  console.log(user);

  return (
    <div className="App  font-graphik ">
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
