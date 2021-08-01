import "./App.css";
import Header from "./components/header";
import TypingTest from "./components/typingtest";
import { Router, Route, Switch } from "react-router-dom";
import history from "./components/history";
import TypingSpeed from "./components/typingspeed";

const App = () => {
  return (
    <div className="ui container">
      <Router history={history}>
        <div>
          <Header />
          <Switch>
            <Route path="/" exact component={TypingSpeed} />
            <Route path="/typingtest" exact component={TypingTest} />
          </Switch>
        </div>
      </Router>
    </div>
  );
};

export default App;
