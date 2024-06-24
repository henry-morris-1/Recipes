/** React imports */
import { useContext, useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation, useNavigate } from "react-router-dom";

/** User context import */
import { UserContext } from "../../App";

/** Component imports */
import Header from "./Header";

/** API import */
import api from "../../api/api";

/**
 * Layout defines the confines of the content on each page
 */
export default function Layout () {
    const { user, setUser } = useContext(UserContext); // Global user state
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

    // Remove the lock class from the body whenever the page changes
    useEffect(() => {
        document.body.classList.remove("lock");
    }, [location.key]);

    return (
        <div className="bg-neutral-100 min-w-screen min-h-screen ">
            <Header setUser={ setUser } />
            <main className="flex justify-center">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <ScrollRestoration />
        </div>
    );
}