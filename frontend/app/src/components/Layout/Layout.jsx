/** React imports */
import { useEffect } from "react";
import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";

/** Component imports */
import Header from "./Header";

/**
 * Layout defines the confines of the content on each page
 */
export default function Layout () {
    // Remove the lock class from the body whenever the page changes
    const location = useLocation();
    useEffect(() => {
        document.body.classList.remove("lock");
    }, [location.key]);

    return (
        <div className="bg-neutral-100 min-w-screen min-h-screen ">
            <Header />
            <main className="flex justify-center">
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <ScrollRestoration />
        </div>
    );
}