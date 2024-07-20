import { useContext, useEffect, useState } from "react";

/** Import the recipe API */
import api from "../../api/api";

/** Import suggestion algorithms */
import suggestions from "../../algorithms/suggestions";

/** Import loader context */
import { LoaderContext } from "../Layout/Layout";

/** Import components */
import RecipeCard from "../Recipe/RecipeCard";

/**
 * 
 */
export default function Home () {
    // Get the recipes from the API
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        api.getRecipes().then(setRecipes);
    }, []);

    // Get the suggestions
    const [suggestedRecipes, setSuggestedRecipes] = useState(null);
    useEffect(() => {
        if (recipes.length > 0) {
            let s = suggestions.getSuggestions(recipes);
            setSuggestedRecipes(s);
        }
    }, [recipes]);

    // Hide the component until loaded
    const handleLoad = useContext(LoaderContext);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        if (suggestedRecipes) {
            handleLoad();
            setIsLoaded(true);
        }
    }, [suggestedRecipes]);

    return (
        <div className="m-2 page">
            {isLoaded && <>
                {suggestedRecipes.old.map((recipe, i) => (
                    <RecipeCard recipe={ recipe } key={ i } />
                ))}

                <hr className="my-4 border-b border-current" />

                {suggestedRecipes.new.map((recipe, i) => (
                    <RecipeCard recipe={ recipe } key={ i } />
                ))}

                <hr className="my-4 border-b border-current" />

                {suggestedRecipes.breakfast.map((recipe, i) => (
                    <RecipeCard recipe={ recipe } key={ i } />
                ))}
            </>}
        </div>
    );
}