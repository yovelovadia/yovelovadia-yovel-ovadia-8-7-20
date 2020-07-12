import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import SignUpScreen from "./screens/SignUpScreen";
import LoginScreen from "./screens/LoginScreen";
import TasksScreen from "./screens/TasksScreen";

const App: React.FC = () => {
  const history = createBrowserHistory();

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={SignUpScreen} />
        <Route path="/login" component={LoginScreen} />
        <Route path="/tasks" component={TasksScreen} />
      </Switch>
    </Router>
  );
};

export default App;
