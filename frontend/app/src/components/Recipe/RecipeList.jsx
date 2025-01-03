/** React imports */
import { useContext, useEffect, useMemo, useRef, useState } from "react";

/** Import the recipe API */
import api from "../../api/api";

/** Import loader context */
import { LoaderContext } from "../Layout/Layout";

/** Import components */
import Menu from "../Menu/Menu";
import { MenuButton } from "../Menu/Menu";
import Modal from "../Modal/Modal";
import { ModalButton } from "../Modal/Modal";
import { FilterList, SortSelection } from "./Filters";
import AddRecipe from "./AddRecipe";
import RecipeCard from "./RecipeCard";

/**
 * The recipe list page shows all recipes in the system and allows
 * the user to filter by tags and sort the recipes by different
 * parameters
 */
export default function RecipeList () {
    // Get the recipes from the API
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        api.getRecipes().then(response => {
            setRecipes(response);
        });
    }, []);

    // Keep an array of filters
    const [filters, setFilters] = useState([]);

    // Keep a sorting function, default sorts by id
    const [sort, setSort] = useState(() => (a, b) => { return a.id - b.id; });

    // Create a list of filtered and sorted recipes which updates in response
    // to the state values and can be used to display which recipes to show
    const filteredRecipes = useMemo(() => {
        // Create a new array for filtered recipes
        let newFilteredRecipes = [];

        // Check each recipe to see if it's been filtered out
        recipes.forEach(recipe => {
            let render = true;
            filters.forEach(filter => {
                // If there is a tag not included in the filters list, don't render it
                if (!recipe.tags.includes(filter)) {
                    render = false;
                }
            });

            // If it is being rendered, push it onto the array
            if (render) {
                newFilteredRecipes.push(recipe);
            }
        });

        // Sort the recipes
        newFilteredRecipes.sort(sort);

        // Return the filtered array, sorted based on the set sorting function
        return newFilteredRecipes;
    }, [recipes, filters, sort]);

    // Hide the component until loaded
    const handleLoad = useContext(LoaderContext);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (filteredRecipes && filteredRecipes.length > 0) {
            handleLoad();
            setIsLoaded(true);
        }
    }, [filteredRecipes]);

    // Get a reference to the filters menu
    const menuRef = useRef(null);

    return (
        <div className="m-2 page">
            {isLoaded && <>
                <div className="flex flex-wrap items-center justify-between my-4">
                    <div className="flex items-center">
                        <AddRecipeModal />
                    </div>

                    <MenuButton menuRef={ menuRef }>
                        <i className="material-symbols-outlined text-3xl px-1 pointer-events-none icon-thick">filter_list</i>
                    </MenuButton>
                </div>

                <Menu ref={ menuRef }>
                    <SortSelection setSort={ setSort } />
                    <hr className="border-t border-white m-3" />
                    <FilterList filters={ filters } setFilters={ setFilters } />
                </Menu>
                
                <div className="gap-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredRecipes && filteredRecipes.map((recipe, i) => (
                        <RecipeCard recipe={ recipe } key={ i } />
                    ))}
                </div>
            </>}
        </div>
    );
}

/**
 * Modal for adding a recipe
 */
function AddRecipeModal () {
    const modalRef = useRef(null);

    return (
        <>
            <Modal title={"Add a recipe"} ref={modalRef}>
                <AddRecipe />
            </Modal>

            <ModalButton modalRef={modalRef}>
                <button className="flex items-center me-3 ps-2 pe-3 py-1 rounded-full bg-green-600 text-lg text-white click-toggle">
                    <i className="material-symbols-outlined text-[1.25em] me-1 click-toggle">add</i>
                    Add a recipe
                </button>
            </ModalButton>
        </>
    );
}