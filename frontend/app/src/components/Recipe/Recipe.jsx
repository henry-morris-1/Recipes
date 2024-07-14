/** React imports */
import { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

/** API import */
import api from "../../api/api";

/** Import loader context */
import { LoaderContext } from "../Layout/Layout";

/** Component imports */
import RatingBadge from "./RatingBadge";
import EditRecipe from "./EditRecipe";
import Modal from "../Modal/Modal";
import { ModalButton } from "../Modal/Modal";
import TabContainer from "../Container/TabContainer";
import { Table, TableData, TableRow } from "../Table/Table";
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
    const [similarRecipes, setSimilarRecipes] = useState(null);
    useEffect(() => {
        api.getSimilarRecipes(id).then(response => {
            setSimilarRecipes(response);
        });
    }, [recipe]);

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

    // Hide the component until loaded
    const handleLoad = useContext(LoaderContext);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (recipe && ratingData && similarRecipes) {
            handleLoad();
            setIsLoaded(true);
        }
    }, [recipe, ratingData, similarRecipes]);

    return (
        <div className="m-2 page">
            {isLoaded && <>
                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                        <h5 className="text-xl text-neutral-500 dark:text-neutral-300 font-bold">#{recipe.id}</h5>
                        <h4 className="mx-3 font-serif-header text-4xl leading-[1.625rem] font-semibold">{recipe.name}</h4>
                    </div>

                    <EditRecipeModal recipe={ recipe } setRecipe={ setRecipe } />
                </div>

                <p className="text-base mt-3 mb-4">{recipe.tags.join(", ")}</p>
                
                <TabContainer className="bg-neutral-300 after:bg-neutral-300 dark:bg-neutral-700 dark:after:bg-neutral-700 dark:text-white" title={ "Ratings" }>
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
                </TabContainer>

                {similarRecipes && similarRecipes.length > 0 && <div className="mt-6">
                    <TabContainer className="bg-neutral-300 after:bg-neutral-300 dark:bg-neutral-700 dark:after:bg-neutral-700 dark:text-white" title={ "Similar recipes" }>
                        <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                            {similarRecipes.map((recipe, i) => (
                                <div className="border border-current rounded-2xl" key={ i }>
                                    <RecipeCard recipe={ recipe } />
                                </div>
                            ))}
                        </div>
                    </TabContainer>
                </div>}
            </>}
        </div>
    );
}

function EditRecipeModal ({ recipe, setRecipe }) {
    const modalRef = useRef(null);

    return (
        <>
            <Modal title={"Edit recipe"} ref={modalRef}>
                <EditRecipe recipe={ recipe } setRecipe={ setRecipe } />
            </Modal>

            <ModalButton modalRef={modalRef}>
                <button className="click-toggle">
                    <i className="material-symbols-outlined click-toggle">stylus</i>
                </button>
            </ModalButton>
        </>
    );
}