/** React imports */
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

/** API import */
import api from "../../api/api";

/**
 * Modal for submitting a new recipe. Upon submission, the user is redirected
 * to the page for the newly created recipe.
 */
export default function AddRecipe () {
    const navigate = useNavigate();

    // State variables for the form inputs
    const [name, setName] = useState("");
    const [tags, setTags] = useState([]);
    const [aRating, setARating] = useState("");
    const [jRating, setJRating] = useState("");
    const [hRating, setHRating] = useState("");

    // Handle submission by creating a new recipe object from the state variables, submitting
    // to the API, then redirecting to the new recipe's page
    function submit (event) {
        // Prevent default submission behavior
        event.preventDefault();

        // Create a new recipe object from the state variables
        const newRecipe = {
            name: name,
            tags: tags,
            aRating: aRating || null,
            jRating: jRating || null,
            hRating: hRating || null
        }

        // Make the API call and navigate to the new recipe
        api.addRecipe(newRecipe).then(response => {
            navigate(`/recipes/${response[0].id}`);
        });
    }

    return (
        <div className="w-full flex justify-center">
            <form className="w-full sm:max-w-2xl flex flex-col items-center">
                <NameInput name={ name } setName={ setName } />

                <TagsInput tags={ tags } setTags={ setTags } />

                <fieldset className="w-full flex flex-col items-center mb-6">
                    <div className="w-full">
                        <h2 className="text-2xl font-semibold" htmlFor="name">Ratings</h2>
                        <hr className="w-full border-t border-current mb-1" />
                    </div>
                    <RatingInput name={ "Adriane" } id={ "aRating" } value={ aRating } setValue={ setARating } />
                    <RatingInput name={ "Jeff" } id={ "jRating" } value={ jRating } setValue={ setJRating } />
                    <RatingInput name={ "Henry" } id={ "hRating" } value={ hRating } setValue={ setHRating } />
                </fieldset>

                <div className="w-full flex items-center justify-end">
                    <button className="px-3 py-1 bg-neutral-600 shadow-md rounded-3xl select-none text-sm uppercase font-semibold click-toggle" onClick={e => {e.preventDefault()}}>
                        CANCEL
                    </button>
                    <button className="ms-3 px-3 py-1 bg-blue-600 shadow-md rounded-3xl select-none text-sm uppercase font-semibold" onClick={submit}>
                        SUBMIT
                    </button>
                </div>
            </form>
        </div>
    );
}

/**
 * Input for the recipe name.
 * @param {String} name Input value 
 * @param {Function} setName Function to set a new name
 */
function NameInput ({name, setName}) {
    // Update the state whenever the input is used
    function handleChange (event) {
        // Get the value and bounding parameters from the input
        let {maxLength, value} = event.target;

        // Bound the length of a string by maxLength
        if (value) {
            value = value.substring(0, maxLength);
        }

        // Set the new value
        setName(value);
    }

    return (
        <fieldset className="w-full flex flex-col items-center mb-6">
            <div className="w-full">
                <h2 className="text-2xl font-semibold" htmlFor="name">Name</h2>
                <hr className="w-full border-t border-current mb-3" />
            </div>
            <input className="w-full mx-1 px-4 py-1 bg-neutral-600 shadow-md rounded-full text-lg" id="name" name="Name" maxLength={100} type="text" value={name} onChange={handleChange} />
        </fieldset>
    );
}

/**
 * Input for selecting recipe tags
 * @param {Array} tags Array of selected tags
 * @param {Function} setTags Function to set new tags
 */
function TagsInput ({tags, setTags}) {
    // Get all existing tags from the database
    const [existingTags, setExistingTags] = useState(null);
    useEffect(() => {
        api.getTags().then(setExistingTags);
    }, []);

    // Toggles the targeted tag to/from the tags list
    function toggleTag (event) {
        let newTags = [...tags]; // Create a new copy of the tags to operate on
        let value = event.target.innerHTML; // Get the name of the tag clicked
        let index = tags.indexOf(value); // Get the index of the given tag

        // If the tag is in the array, splice it, otherwise push it onto the array
        if (index > -1) {
            newTags.splice(index, 1);
        } else {
            newTags.push(value);
        }

        // Update the tags
        setTags(newTags);
    }
    
    return (
        <fieldset className="flex flex-col items-center mb-6">
            <div className="w-full">
                <h2 className="text-2xl font-semibold" htmlFor="name">Tags</h2>
                <hr className="w-full border-t border-current mb-2" />
            </div>
            <div className="flex flex-wrap justify-around">
                {existingTags && existingTags.map((tag, i) => (
                    <span 
                    key={ i }
                    role="button"
                    className={"inline m-1 px-3 py-1 rounded-full shadow-md select-none text-sm uppercase font-semibold " + (tags.includes(tag) ? "bg-blue-600" : "bg-neutral-600")}
                    onClick={toggleTag}>
                        {tag}
                    </span>
                ))}
            </div>
        </fieldset>
    );
}

/**
 * Input for recipe ratings.
 * @param {String} name Name of the rater
 * @param {String} id HTML id for the input
 * @param {Number} value Value of the input
 * @param {Function} setValue Function to set value
 */
function RatingInput ({name, id, value, setValue}) {
    // Update the state whenever the input is used
    function handleChange (event) {
        // Get the value and bounding parameters from the input
        let {min, max, value} = event.target;

        // Bound numbers by min and max
        if (value) {
            value = Math.max(min, Math.min(max, Number(value)));
        }

        // Set the new value
        setValue(value);
    }

    return (
        <div className="w-full flex items-center justify-between mt-2">
            <label className="text-lg font-medium text-neutral-200" htmlFor={id}>{name}</label>
            <span className="grow mx-3 border-b-2 border-dotted border-neutral-200"></span>
            <input className="px-6 py-1 bg-neutral-600 shadow-md rounded-full text-lg text-center" id={id} name={`${name}'s rating`} min={1} max={10} type="number" value={value} onChange={handleChange} />
        </div>
    );
}