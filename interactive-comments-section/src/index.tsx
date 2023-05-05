import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/App";

import { storeContext } from "./contexts/storeContext";
import store from "./store";

import "./main.global.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

store.currentUser.load();

root.render(
  <React.StrictMode>
    <storeContext.Provider value={store}>
      <App />
    </storeContext.Provider>
  </React.StrictMode>
);
