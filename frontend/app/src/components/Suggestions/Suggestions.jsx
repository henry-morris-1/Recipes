import { useContext, useEffect, useState } from "react";

/** Import suggestion algorithms */
import suggestions from "../../algorithms/suggestions";

/** Import loader context */
import { LoaderContext } from "../Layout/Layout";

/** Import components */
import RecipeCard from "../Recipe/RecipeCard";

/**
 * 
 */
export default function Suggestions () {
    // Get the suggestions
    const [suggestedRecipes, setSuggestedRecipes] = useState(null);
    useEffect(() => {
        suggestions.getSuggestions().then(response => {
            setSuggestedRecipes(response);
        });
    }, []);

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
                <SuggestionSection title={ "Revisit an old recipe" } recipes={ suggestedRecipes.old } />
                <SuggestionSection title={ "Try something new" } recipes={ suggestedRecipes.new } />
                <SuggestionSection title={ "Breakfast favorites" } recipes={ suggestedRecipes.breakfast } />
            </>}
        </div>
    );
}

function SuggestionSection ({title, recipes}) {
    return (
        <section className="mt-6 first-of-type:mt-4">
            <h2 className="text-3xl font-semibold">{title}</h2>
            <hr className="w-full border-t border-current mb-1" />

            {recipes.map((recipe, i) => (
                <div className="my-2" key={ i }>
                    <RecipeCard recipe={ recipe } />
                </div>
            ))}
        </section>
    );
}