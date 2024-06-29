/** React imports */
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

/** API import */
import api from "../../api/api";

/** Component imports */
import RatingBadge from "./RatingBadge";
import TabContainer from "../Container/TabContainer";
import { Table, TableData, TableRow } from "../Table/Table";
import Modal from "../Modal/Modal";
import { ModalButton } from "../Modal/Modal";
import RecipeCard from "./RecipeCard";

/**
 * The recipe page shows all information about a given recipe
 */
export default function Recipe () {
    // Get the recipe id
    let { id } = useParams();

    // Get the recipe from the API
    const [recipe, setRecipe] = useState(null);
    function formatRecipe (response) {
        setRecipe(response[0]);
    }
    useEffect(() => {
        api.getRecipeById(id).then(formatRecipe);
    }, [id]);

    // Get similar recipes from the API
    const [similarRecipes, setSimilarRecipes] = useState([]);
    useEffect(() => {
        api.getSimilarRecipes(id).then(response => {
            setSimilarRecipes(response);
        });
    }, [id]);

    // Put the ratings data into a 2D array for display in the table
    const [ratingData, setRatingData] = useState(null);
    useEffect(() => {
        if (recipe) {
            // Put the rating data into a 2D array
            const newRatingData = [
                ["Adriane", recipe.aRating],
                ["Jeff", recipe.jRating],
                ["Henry", recipe.hRating]
            ];

            // Set the rating data
            setRatingData(newRatingData);
        }
    }, [recipe]);

    return (
        <div className="m-2">
            {recipe && <>
                <div className="flex items-center justify-between text-4xl leading-8 uppercase font-bold">
                    <div className="flex items-center">
                        <h5 className="text-xl text-neutral-500">#{recipe.id}</h5>
                        <h4 className="mx-3">{recipe.name}</h4>
                    </div>

                    <button>
                        <i className="material-symbols-outlined">stylus</i>
                    </button>
                </div>

                <p className="text-base mt-3 mb-4">{recipe.tags.join(", ")}</p>
                
                {ratingData && <>
                    <TabContainer className=" bg-neutral-300 after:bg-neutral-300" title={ <RatingTableModal ratingData={ ratingData } recipe={ recipe } formatRecipe={ formatRecipe } /> }>
                        {ratingData && <>
                            <Table>
                                {ratingData.map((row, i) => (
                                    <TableRow key={ i }>
                                        {row.map((value, j) => (
                                            <TableData className="even:px-[1.75em]" key={ j }>
                                                {value}
                                            </TableData>
                                        ))}
                                    </TableRow>
                                ))}

                                <TableRow>
                                    <TableData>Avg</TableData>
                                    <TableData className="text-2xl font-bold py-0">
                                        <RatingBadge rating={ recipe.avgRating } />
                                    </TableData>
                                </TableRow>
                            </Table>
                        </>}
                    </TabContainer>
                </>}
            </>}

            {similarRecipes && similarRecipes.length > 0 && <div className="mt-6">
                    <TabContainer className=" bg-neutral-300 after:bg-neutral-300" title={ "Similar recipes" }>
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {similarRecipes && similarRecipes.map((recipe, i) => (
                                <div className="border border-current rounded-2xl" key={ i }>
                                    <RecipeCard recipe={ recipe } />
                                </div>
                                
                            ))}
                        </div>
                    </TabContainer>

            </div>}
        </div>
    );
}

/**
 * Modal for setting and saving new ratings for the recipe.
 * @param {Object} recipe Current recipe state
 * @param {Function} formatRecipe Takes in an API response and sets the recipe
 */
function RatingTableModal ({ recipe, formatRecipe }) {
    // Get a reference to the modal for the modal button
    const modalRef = useRef(null);

    // Track the selected values and update them when the input changes
    const [selected, setSelected] = useState([["Adriane", recipe.aRating || ""], ["Jeff", recipe.jRating || ""], ["Henry", recipe.hRating || ""]]);
    function handleChange (event, index) {
        const newSelected = [...selected]; // Copy the value of selected
        let { min, max, value } = event.target; // Get the min, max, and input value

        if (value) {
            value = Math.max(Number(min), Math.min(Number(max), Number(value)));  // Bound value by min and max
        }
        
        newSelected[index][1] = value; // Insert value into the new selected array
        setSelected(newSelected); // Set the new selected array
    }

    // Save the updated ratings to the database
    function save () {
        // Create a deep copy of the current recipe
        const newRecipe = JSON.parse(JSON.stringify(recipe));

        // Put the newly selected values in
        newRecipe.aRating = selected[0][1] || null;
        newRecipe.jRating = selected[1][1] || null;
        newRecipe.hRating = selected[2][1] || null;

        // Make the API call, then update the recipe with the response
        api.updateRecipe(recipe.id, newRecipe).then(formatRecipe);
    }

    return (
        <>
            <Modal title={ "Edit Ratings" } ref={ modalRef }>
                {selected.map((rating, i) => (
                    <label className="flex items-center justify-between mb-3" key={ i }>
                        <span className="text-base font-medium">
                            {rating[0]}
                        </span>
                        <input type="number" className="px-3 py-4 m-0 w-20 text-center text-sm font-bold rounded-full bg-neutral-600" name={`Set ${rating[0]}'s rating`} min="1" max="10" value={rating[1]} onChange={(e) => {handleChange(e, i)}} />
                    </label>
                ))}

                <div className="flex items-center justify-end mt-6">
                    <button className="px-3 py-1 bg-neutral-600 shadow-md rounded-3xl select-none text-sm uppercase font-semibold click-toggle">
                        CANCEL
                    </button>
                    <button className="ms-3 px-3 py-1 bg-blue-600 shadow-md rounded-3xl select-none text-sm uppercase font-semibold click-toggle" onClick={ save }>
                        SAVE
                    </button>
                </div>
            </Modal>

            <h1 className="flex items-center">
                Ratings

                <ModalButton modalRef={ modalRef }>
                    <i role="button" className="material-symbols-outlined ml-3 click-toggle">stylus</i>
                </ModalButton>
            </h1>
        </>
    );
}