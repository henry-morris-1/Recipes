/** React imports */
import { Link } from 'react-router-dom';

/** Import components */
import RatingBadge from './RatingBadge';

/**
 * Card displaying the recipe, tags, rating, and linking
 * to its page.
 * @param {Recipe} recipe Recipe to display
 */
export default function RecipeCard ({ recipe }) {
    // Format the date into MM/DD/YY
    function formatDate (dateString) {
        return dateString.slice(5,7) + '/' + dateString.slice(8,10) + '/' + dateString.slice(2,4);
    }

    return (
        <div className="flex flex-col justify-between p-4 bg-neutral-300 rounded-2xl">
            <div className="flex items-center justify-between text-2xl leading-6 uppercase font-bold">
                <h4 className="me-3">{recipe.name}</h4>
                <RatingBadge rating={ recipe.avgRating } />
            </div>

            <div>
                {recipe.history.length > 0 && <>
                    <hr className="border-t border-current my-2" />
                    <h6 className="font-serif">
                        Last eaten {formatDate(recipe.history.slice(-1)[0])}
                    </h6>
                </>}

                {recipe.tags.length > 0 && <>
                    <hr className="border-t border-current my-2" />
                    <p className="font-serif">{recipe.tags.join(', ')}</p>
                </>}
            </div>
            
            <div className="w-full pt-2">
                <Link 
                 to={"/recipes/" + recipe.id}
                 role="button"
                 className="flex items-center justify-center p-2 border border-current rounded-full font-bold"
                 style={{transition: "0.125s linear"}}>
                    SEE RECIPE
                    <i className="material-symbols-outlined ms-1 icon-thick" style={{fontSize: "1.3em"}}>arrow_outward</i>
                </Link>
            </div>
        </div>
    );
}