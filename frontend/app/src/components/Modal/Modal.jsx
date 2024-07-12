/** React imports */
import { forwardRef, useImperativeHandle, useRef, useState } from "react";

/**
 * Modal which opens on the center of the page. Can be dismissed by elements with the
 * "click-toggle" class. Opened with a ModalButton given a reference to this Modal.
 * @param {String} title Modal title
 */
export default forwardRef(function Modal ({ title, children }, ref) {
    // Use a reference to the modal for toggleModal
    const modalRef = useRef(null);

    // Track whether the modal is open, if yes, the modal is rendered in the DOM
    const [open, setOpen] = useState(false);

    // Put the toggleModal function inside the forwardRef
    useImperativeHandle(ref, () => {
        return {
            toggleModal,
        };
    }, []);

    // Toggles the drawer open and closed
    const toggleModal = (event) => {
        // Get the classes of the click target
        const targetClasses = [...event.target.classList];

        // If the element that was clicked is closes the modal, toggle the modal element
        if (targetClasses.includes("click-toggle")) {
            // Toggle the body lock class
            document.body.classList.toggle("lock");

            if (open) {
                // Remove the open class to animate the fade out and set a timeout to
                // remove the element once the animation is done
                modalRef.current.classList.toggle("open");
                setTimeout(() => { setOpen(false) }, 225);
            } else {
                // If the modal isn't open, render it
                setOpen(true);
            }
        }
    }

    return (
        <>{open && 
            <div className="modal fixed z-50 flex p-2 text-left bg-neutral-200/50 dark:bg-neutral-800/50 overflow-scroll click-toggle open" ref={ modalRef } onClick={ toggleModal }>
                <div className="z-50 m-auto p-2 w-full sm:w-[39rem] max-h-fit rounded-3xl bg-neutral-900/50 backdrop-blur-2xl text-white">
                    <div className="flex flex-row items-center justify-between p-3">
                        <h1 className="text-3xl font-bold leading-7 me-2">{title}</h1>
                        <i role="button" className="material-symbols-outlined text-3xl icon-thick click-toggle">close</i>
                    </div>
                    
                    <div className="p-3">
                        {children}
                    </div>
                </div>
            </div>
        }</>
    );
});

/**
 * Button to open a modal
 * @param {Element} modalRef Reference to the modal this button opens
 */
export function ModalButton ({ children, modalRef }) {
    // Ensures the toggleModal function exists, then calls it
    function handleClick (event) {
        modalRef.current && modalRef.current.toggleModal(event);
    }

    return (
        <span className="flex items-center click-toggle" role="button" onClick={handleClick}>
            {children}
        </span>
    );
}