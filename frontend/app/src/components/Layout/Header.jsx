/** React imports */
import { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

/** Component imports */
import Menu from "../Menu/Menu";
import { MenuButton } from '../Menu/Menu';

/**
 * Page header consistent across the entire site
 */
export default function Header () {
    // Keep a reference to the nav menu
    const menuRef = useRef(null);

    // Keep the location of this page
    const location = useLocation();
    
    /**
     * Primary navigation menu between pages
     */
    function NavMenu () {
        // Create an array of each item within the menu
        const menuItems = [
            {
                text: 'Suggestions',
                icon: 'batch_prediction',
                link: ''
            },
            {
                text: 'Recipes',
                icon: 'receipt_long',
                link: 'recipes'
            },
            {
                text: 'Calendar',
                icon: 'calendar_month',
                link: 'calendar'
            }
        ];

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
                </Menu>
            </nav>
        );
    }

    return (
        <header className="flex justify-center">
            <div className="container relative flex items-center justify-between p-2">
                <div>{(location.key !== "default") && <>
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