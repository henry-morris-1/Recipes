/** HTTP Client */
import HTTPClient from "./HTTPClient";

/**
 * Get all recipes in the database.
 * @returns All recipes
 */
const getRecipes = () => {
    const url = "/api/recipes";
    return HTTPClient.get(url);
}

/**
 * Gets a specific recipe with the given ID.
 * @param {Number} recipeId ID of the recipe to get
 * @returns The recipe with the given ID
 */
const getRecipeById = (recipeId) => {
    const url = "/api/recipes/" + recipeId;
    return HTTPClient.get(url);
}

/**
 * Gets recipes with at least two intersecting tags
 * @param {Number} recipeId ID of the recipe to match
 * @returns Recipes with similar tags
 */
const getSimilarRecipes = (recipeId) => {
    const url = "/api/recipes/" + recipeId + "/similar";
    return HTTPClient.get(url);
}

/**
 * Updates the recipe with the given ID.
 * @param {Number} recipeId Recipe to update
 * @param {Object} recipe Recipe to insert
 * @returns Updated recipe with the given ID
 */
const updateRecipe = (recipeId, recipe) => {
    const url = "/api/recipes/" + recipeId;
    return HTTPClient.put(url, recipe);
}

/**
 * Get all tags in the database.
 * @returns All tags
 */
const getTags = () => {
    const url = "/api/tags";
    return HTTPClient.get(url);
}

/**
 * Gets the entire calendar from the database.
 * @returns Entire calendar
 */
const getCalendar = () => {
    const url = "/api/calendar";
    return HTTPClient.get(url);
}

/**
 * Adds new dates to the calendar with null recipe IDs.
 * @param {Array} newDays New dates to add
 * @returns Entire updated calendar
 */
const addCalendarDays = (newDays) => {
    const url = "/api/calendar";
    return HTTPClient.post(url, newDays);
}

/**
 * Updates the recipe id values for each item in the array. 
 * Items have a date and recipeId.
 * @param {Array} calendar Array of dates to update
 * @returns Entire updated calendar
 */
const updateCalendar = (calendar) => {
    const url = "/api/calendar";
    return HTTPClient.put(url, calendar);
}

const api = {
    getRecipes,
    getRecipeById,
    getSimilarRecipes,
    updateRecipe,
    getTags,
    getCalendar,
    addCalendarDays,
    updateCalendar
}
export default api;