/** Import react and react router */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** Import components to be routed */
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import RecipeList from "./components/Recipe/RecipeList";
import Recipe from "./components/Recipe/Recipe";
import Calendar from "./components/Calendar/Calendar";

/** Import the stylesheet for the app */
import "./index.css";

/** Create the router paths */
const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "recipes",
                element: <RecipeList />
            },
            {
                path: "recipes/:id",
                element: <Recipe />
            },
            {
                path: "calendar",
                element: <Calendar />
            }
        ]
    }
]);

/** The router is at the very root of the app */
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
