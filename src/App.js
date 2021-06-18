import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import Panel from "./Panel";
import Signup from "./Signup";
import { Helmet } from "react-helmet";
import "./app.css";
import { useStateValue } from "./StateProvider";

const TITLE = "Tracklab Music Distribution";
function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <>
      <Helmet>
        <title>{TITLE}</title>
      </Helmet>
      <div className="App font-normal  ">
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
    </>
  );
}

export default App;
