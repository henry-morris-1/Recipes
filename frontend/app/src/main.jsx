/** Import react and react router */
import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** Import components to be routed */
import Login from "./components/Layout/Login";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import RecipeList from "./components/Recipe/RecipeList";
import Recipe from "./components/Recipe/Recipe";
import Calendar from "./components/Calendar/Calendar";

/** Import the stylesheet for the app */
import "./index.css";

/** Export the current user context */
export const UserContext = React.createContext(null);

/** Create the router paths */
const router = createBrowserRouter([
    {
        path: "/login",
        element: <Login />
    },
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
        <App />
    </React.StrictMode>,
);

function App () {
    const [user, setUser] = React.useState(null);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}
