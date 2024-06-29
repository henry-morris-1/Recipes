/** React imports */
import { createContext, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

/** Import components to be routed */
import Login from "./components/Layout/Login";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import RecipeList from "./components/Recipe/RecipeList";
import Recipe from "./components/Recipe/Recipe";
import Calendar from "./components/Calendar/Calendar";

/** Export the current user context */
export const UserContext = createContext(null);

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

export default function App () {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
            <RouterProvider router={router} />
        </UserContext.Provider>
    );
}