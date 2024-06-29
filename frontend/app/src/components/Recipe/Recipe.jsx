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
                    <TabContainer className=" bg-neutral-300 after:bg-neutral-300" title={ "Ratings" }>
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
                                    <TableData>
                                        Avg.
                                    </TableData>
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