import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import OrderBook from "./components/OrderBook";
import Ticker from "./components/Ticker";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Logo
          </Link>
        </nav>
        <div className="container-fluid mt-3" style={{width: "70vw"}}>
          <Switch>
            <Route exact path="/" component={Ticker} />
            <Route exact path="/order-book" component={OrderBook} />
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
