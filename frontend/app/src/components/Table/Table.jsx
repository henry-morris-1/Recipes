/**
 * Table
 */
export function Table ({ children }) {
    return (
        <table className="table-auto w-full">
            <tbody>
                {children}
            </tbody>
        </table>
    );
}

/**
 * Table row
 */
export function TableRow ({ children, className }) {
    return (
        <tr className={"border-b last-of-type:border-0 border-current flex flex-row items-center justify-between " + className}>
            {children}
        </tr>
    );
}

/**
 * Table cell
 */
export function TableData ({ children }) {
    return (
        <td className="p-4 text-center first-of-type:text-left last-of-type:text-right">
            {children}
        </td>
    );
}