import "./App.css";

import React from "react";
import { Provider } from "react-redux";
import AppRouter from "./routers/AppRouter";
import configureStore from "./state/store/configureStore";

const store = configureStore();
function App() {
  return (
    <>
      <Provider store={store}>
        <AppRouter></AppRouter>
      </Provider>
    </>
  );
}

export default App;
