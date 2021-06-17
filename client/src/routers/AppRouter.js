import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Header from "../components/Header";
import CategoryPage from "../components/pages/CategoryPage";
import HomePage from "../components/pages/HomePage";
import LoginPage from "../components/pages/LoginPage";
import NotFoundPage from "../components/pages/NotFoundPage";
import ProductPage from "../components/pages/ProductPage";
import SearchPage from "../components/pages/SearchPage";

const createHistory = require("history").createBrowserHistory;
export const history = createHistory();
const AppRouter = () => (
  <Router history={history}>
    <>
      <Header history={history} />

      <Switch>
        <Route path="/" component={HomePage} exact={true} />
        <Route path="/category/:nom" component={CategoryPage} />
        <Route path="/search/:search" component={SearchPage} />
        <Route path="/product/:id" component={ProductPage} />

        <Route path="/login" component={LoginPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  </Router>
);

export default AppRouter;
