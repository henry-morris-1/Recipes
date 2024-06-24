
/**
 * Container with a title in a tab above it
 * @param {String} title Container title
 */
export default function TabContainer ({ title, children, className }) {
    /**
     * Container header containing the title
     * @param {String} title Container title 
     */
    function ContainerHeader ({ className }) {
        return (
            <div className={"relative w-fit px-3 pt-3 rounded-tl-xl text-2xl text-black font-bold " + className}>
                <div className={"tab " + className}>
                    {title}
                </div>
            </div>
        );
    }

    return (
        <div>
            <ContainerHeader className={ className } title={ title } />
            <div className={"p-4 text-black rounded-tr-xl rounded-b-xl " + className}>
                {children}
            </div>
        </div>
    );
}