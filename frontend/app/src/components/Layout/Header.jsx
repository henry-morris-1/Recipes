/** React imports */
import { useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

/** Component imports */
import Menu from "../Menu/Menu";
import { MenuButton } from "../Menu/Menu";

/** API import */
import api from "../../api/api";

/**
 * Page header consistent across the entire site
 * @param {Function} setUser Function to set the global user context
 */
export default function Header ({ setUser }) {
    const menuRef = useRef(null); // Menu element ref
    const navigate = useNavigate(); // Navigate hook
    const location = useLocation(); // Location hook

    useEffect(() => {
        console.log(location);
    }, [location]);

    // Create an array of each item within the menu
    const menuItems = [
        {
            text: "Suggestions",
            icon: "batch_prediction",
            link: ""
        },
        {
            text: "Recipes",
            icon: "receipt_long",
            link: "recipes"
        },
        {
            text: "Calendar",
            icon: "calendar_month",
            link: "calendar"
        }
    ];

    // Log the user out using the API, then redirect them to the login page
    function logout () {
        api.logout().then(() => {
            setUser(null);
            navigate("/login");
        });
    }
    
    /**
     * Primary navigation menu between pages
     */
    function NavMenu () {
        return (
            <nav>
                <Menu ref={ menuRef }>
                    <div>
                        {menuItems.map((item, i) => (
                            <Link to={item.link} key={ i } className="flex items-center p-3 text-3xl font-medium click-toggle">
                                <i className="material-symbols-outlined me-3 text-3xl icon-medium">{item.icon}</i>
                                {item.text}
                            </Link>
                        ))}
                    </div>

                    <div className="flex flex-col justify-end mt-auto">
                        <button className="m-3 flex items-center justify-center p-3 bg-neutral-600 rounded-full text-lg font-medium" onClick={logout}>
                            <i className="material-symbols-outlined me-3 text-[1.25em] icon-thick">logout</i>
                            Logout
                        </button>
                    </div>
                </Menu>
            </nav>
        );
    }

    return (
        <header className="flex justify-center">
            <div className="container relative flex items-center justify-between p-2">
                <div>{(location.key !== "default" && !(location.state && location.state.from === "/login")) && <>
                    <Link to={-1} className="flex items-center my-2 px-2 py-1">
                        <i className="material-symbols-outlined me-1 pointer-events-none icon-medium">arrow_back</i>
                        BACK
                    </Link>
                </>}</div>

                <MenuButton menuRef={ menuRef }>
                    MENU
                    <i className="material-symbols-outlined ms-1 pointer-events-none icon-medium">menu</i>
                </MenuButton>
            </div>

            <NavMenu />
        </header>
    );
}