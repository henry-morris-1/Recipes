/** React imports */
import { createContext, useContext, useEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";

/** User context import */
import { UserContext } from "../../App";

/** Component imports */
import Header from "./Header";
import Loader from "../Loader/Loader";

/** API import */
import api from "../../api/api";

/** Export loader context */
export const LoaderContext = createContext(null);

/**
 * Layout defines the confines of the content on each page
 */
export default function Layout () {
    const { user, setUser } = useContext(UserContext); // Global user state
    const loaderRef = useRef(); // Loader element reference
    const navigate = useNavigate(); // Navigation hook
    const location = useLocation(); // Location hook

    // Get the current user or redirect to the login page if they arent
    // authenticated
    useEffect(() => {
        api.getCurrentUser()
            .then(res => {
                setUser(res.user);
            })
            .catch(err => {
                navigate("/login");
            });
    }, []);

    // Run on page changes
    useEffect(() => {
        // Remove the lock class from the body whenever the page changes
        document.body.classList.remove("lock");

        // Show the loader when the page changes
        loaderRef.current && loaderRef.current.classList.remove("hide");
    }, [location.key]);

    // Function called within child components to hide the loader
    function handleLoad () {
        loaderRef.current && loaderRef.current.classList.add("hide");
    }

    return (
        <div className="bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white min-w-screen min-h-screen ">
            <Header setUser={ setUser } />
            <main className="flex justify-center">
                <div className="container">
                    <div className="loader" ref={ loaderRef }>
                        <Loader />
                    </div>

                    <LoaderContext.Provider value={ handleLoad }>
                        <Outlet />
                    </LoaderContext.Provider>
                    
                </div>
            </main>
            <ScrollRestoration />
        </div>
    );
}