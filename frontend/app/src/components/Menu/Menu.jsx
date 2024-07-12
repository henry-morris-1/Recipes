/** React imports */
import { forwardRef, useImperativeHandle, useRef } from "react";

/**
 * Sidebar menu controlled by the toggleMenu function, which is accessed by getting a
 * ref to the Menu component. Any children inside the menu which toggle it closed upon
 * clicking it must have the "click-toggle" class.
 * @param {Array} children Child components within the menu
 * @param {Ref} ref Reference passed in by the parent for the toggleMenu function
 */
export default forwardRef(function Menu ({ children }, ref) {
    // Use a reference to the menu drawer for toggleMenu
    const menuRef = useRef(null);

    // Put the toggleMenu function inside the forwardRef
    useImperativeHandle(ref, () => {
        return {
            toggleMenu,
        };
    }, []);

    // Toggles the drawer open and closed
    const toggleMenu = (event) => {
        // Get the classes of the click target
        const targetClasses = [...event.target.classList];

        // If the element that was clicked is closes the menu, toggle the open class
        // and toggle the scroll lock
        if (targetClasses.includes("click-toggle")) {
            menuRef.current.classList.toggle("open");
            document.body.classList.toggle("lock");
        }
    }

    return (
        <nav className="menu-drawer fixed z-50 flex justify-end bg-neutral-200/50 dark:bg-neutral-800/50 click-toggle" ref={ menuRef } onClick={ toggleMenu }>
            <div className="sm:w-96 w-1/2 p-2">
                <div className="h-full flex flex-col p-2 rounded-3xl bg-neutral-900/50 backdrop-blur-2xl text-white">
                    <div className="flex flex-row-reverse">
                        <i role="button" className="material-symbols-outlined p-3 text-3xl icon-thick click-toggle">close</i>
                    </div>

                    {children}
                </div>
            </div>
        </nav>
    );
});

/**
 * Button which toggles a menu open and closed using the toggleMenu function within
 * the given menuRef. Children need pointer events set to none.
 * @param {Array} children Child elements
 * @param {Ref} menuRef Reference to the controlled menu"s toggleMenu function
 */
export function MenuButton ({ children, menuRef }) {
    // Ensures the togglemenu function exists, then calls it
    function handleClick (event) {
        menuRef.current && menuRef.current.toggleMenu(event);
    }

    return (
        <button className="flex items-center click-toggle" onClick={handleClick}>
            {children}
        </button>
    );
}