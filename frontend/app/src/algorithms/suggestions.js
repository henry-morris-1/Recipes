/**
 * 
 * @param {Array} recipes Array of all recipes
 * @returns 
 */
function getSuggestions (recipes) {
    const oldRecipes = [];
    const newRecipes = [];
    const breakfastRecipes = [];

    recipes.forEach(recipe => {
        if (!recipe.aRating && !recipe.jRating && !recipe.hRating) {
            newRecipes.push(recipe);
        } else if (recipe.tags.includes("Breakfast")) {
            breakfastRecipes.push(recipe);
        } else {
            oldRecipes.push(recipe);
        }
    });

    return {
        old: getOld(oldRecipes),
        new: getNew(newRecipes),
        breakfast: getBreakfast(breakfastRecipes)
    }
}

/**
 * 
 * @param {Array} recipes Old recipes
 * @returns 
 */
function getOld (recipes) {
    return recipes.slice(0, 5);
}

/**
 * 
 * @param {Array} recipes New recipes
 * @returns 
 */
function getNew (recipes) {
    return recipes.slice(0, 5);
}

/**
 * 
 * @param {Array} recipes Breakfast recipes
 * @returns 
 */
function getBreakfast (recipes) {
    return recipes.slice(0, 5);
}

const suggestions = {
    getSuggestions
};
export default suggestions;