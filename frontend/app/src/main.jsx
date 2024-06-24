/** Import react and react router */
import * as React from "react";
import * as ReactDOM from "react-dom/client";

/** Import the app component */
import App from "./App";

/** Import the stylesheet for the app */
import "./index.css";

/** The router is at the very root of the app */
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);