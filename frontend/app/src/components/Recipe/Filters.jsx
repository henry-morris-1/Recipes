/** React imports */
import { useEffect, useState } from 'react';

/** Import the recipe API */
import api from '../../api/api';

/**
 * Select input element which updates the sorting function for the recipe list
 * @param {Function} setSort Sets a new value for the sorting function 
 */
export function SortSelection ({ setSort }) {
    // Store the input value
    const [selectedSort, setSelectedSort] = useState("default");

    // Default sorts by id
    const defaultSort = (a, b) => {
        return a.id - b.id;
    }

    // Sort highest score first
    const ratingSort = (a, b) => {
        return b.avgRating - a.avgRating;
    }

    // Sort recipes by most recent first, putting unlogged recipes last
    const dateNewSort = (a, b) => {
        const aLogged = a.history.length > 0;
        const bLogged = b.history.length > 0;

        if (aLogged && bLogged) {
            return b.history.slice(-1)[0].localeCompare(a.history.slice(-1)[0]);
        } else if (aLogged) {
            return -1;
        } else if (bLogged) {
            return 1;
        } else {
            return 0;
        }
    }

    // Sort recipes by oldest first, putting unlogged recipes last
    const dateOldSort = (a, b) => {
        const aLogged = a.history.length > 0;
        const bLogged = b.history.length > 0;

        if (aLogged && bLogged) {
            return a.history.slice(-1)[0].localeCompare(b.history.slice(-1)[0]);
        } else if (aLogged) {
            return -1;
        } else if (bLogged) {
            return 1;
        } else {
            return 0;
        }
    }

    // Sort by the number of times eaten
    const frequencySort = (a, b) => {
        return b.history.length - a.history.length;
    }

    // Whenever the selected value is updated, update the sort function in kind
    useEffect(() => {
        switch (selectedSort) {
            case "default":
                setSort(() => (a, b) => defaultSort(a, b));
                break;
            case "rating":
                setSort(() => (a, b) => ratingSort(a, b));
                break;
            case "date-new":
                setSort(() => (a, b) => dateNewSort(a, b));
                break;
            case "date-old":
                setSort(() => (a, b) => dateOldSort(a, b));
                break;
            case "frequency":
                setSort(() => (a, b) => frequencySort(a, b));
                break;
        }
    }, [selectedSort]);

    // Store the value
    const formValues = [
        {
            title: "Default",
            value: "default"
        },
        {
            title: "Rating",
            value: "rating"
        },
        {
            title: "Times eaten",
            value: "frequency"
        },
        {
            title: "Date: newest first",
            value: "date-new"
        },
        {
            title: "Date: oldest first",
            value: "date-old"
        }
    ]

    return (
        <div className="px-3 pb-3">
            <h2 className="text-3xl font-bold mb-2" htmlFor="sortSelect">Sort By</h2>

            <div className="">
                {formValues.map((item, i) => (
                    <div className="flex items-center py-1 text-xl" key={ i }>
                        <input 
                            className="me-2 border-white before:bg-white radio"
                            id={"sort-" + item.value}
                            type="radio"
                            name="sort"
                            value={item.value}
                            checked={ selectedSort === item.value }
                            onChange={event => setSelectedSort(event.target.value)} 
                        />
                        <label htmlFor={"sort-" + item.value}>{item.title}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}

/**
 * Filter buttons which toggle tags into and out of the filters list
 * @param {Array} filters Array of filters
 * @param {Function} setFilters Function to set a new value for filters 
 */
export function FilterList({ filters, setFilters }) {
    // Get all the tags from the API
    const [tags, setTags] = useState([]);
    useEffect(() => {
        api.getTags().then(response => {
            setTags(response);
        });
    }, []);

    // Toggles the targeted filter to/from the filters list
    function toggleFilter (event) {
        let newFilters = [...filters]; // Create a new copy of the filters to operate on
        let filter = event.target.innerHTML; // Get the name of the filter clicked
        let index = filters.indexOf(filter); // Get the index of the given filter

        // If the filter is in the array, splice it, otherwise
        // push it onto the array
        if (index > -1) {
            newFilters.splice(index, 1);
        } else {
            newFilters.push(filter);
        }

        // Update the filters
        setFilters(newFilters);
    }
    
    return (
        <div className="p-2">
            <h2 className="p-1 text-3xl font-bold mb-2">Filter Tags</h2>
            <div className="flex flex-wrap">
                {tags && tags.map((tag, i) => (
                    <span 
                    key={ i }
                    role="button"
                    className={"inline m-1 px-3 py-1 rounded-full shadow-md select-none text-sm uppercase font-semibold " + (filters.includes(tag) ? "bg-blue-600" : "bg-neutral-600")}
                    onClick={toggleFilter}>
                        {tag}
                    </span>
                ))}
            </div>
        </div>
    );
}