/** React imports */
import { Link } from "react-router-dom";

/** Import components */
import RatingBadge from "./RatingBadge";

/**
 * Card displaying the recipe, tags, rating, and linking
 * to its page.
 * @param {Recipe} recipe Recipe to display
 */
export default function RecipeCard ({ recipe }) {
    // Format the date into MM/DD/YY
    function formatDate (dateString) {
        return dateString.slice(5,7) + "/" + dateString.slice(8,10) + "/" + dateString.slice(2,4);
    }

    return (
        <div className="flex flex-col justify-between p-4 bg-neutral-300 rounded-2xl">
            <Link to={"/recipes/" + recipe.id} className="flex items-center justify-between mb-1 text-[1.75rem] leading-[1.375rem] font-semibold">
                <h4 className="me-3 font-serif-header">{recipe.name}</h4>
                <RatingBadge rating={ recipe.avgRating } />
            </Link>

            <div>
                {recipe.history.length > 0 && <>
                    <hr className="border-t border-current my-1" />
                    <h6 className="text-sm">
                        Last eaten {formatDate(recipe.history.slice(-1)[0])}
                    </h6>
                </>}

                {recipe.tags.length > 0 && <>
                    <hr className="border-t border-current my-1" />
                    <p className="text-sm">{recipe.tags.join(', ')}</p>
                </>}
            </div>
        </div>
    );
}