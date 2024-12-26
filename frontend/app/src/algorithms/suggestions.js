/** Import API */
import api from "../api/api";

/** Make tag proximities globally accessible */
let tagProximities;

/**
 * Gets top suggested recipes.
 * @returns Top rated old, new, and breakfast recipes
 */
function getSuggestions () {
    // Create an array of promises for the API calls
    const promises = [];

    // Get recipes, calendar, and tags from the API
    let recipes, calendar, tags;
    promises.push(api.getRecipes().then(response => { recipes = response }));
    promises.push(api.getCalendarWithTags().then(response => { calendar = response }));
    promises.push(api.getTags().then(response => { tags = response }));

    // Once the API calls are done, evaluate the recipes
    return Promise.all(promises).then(() => {
        // Get tag proximities and split the recipes by category
        tagProximities = getTagProximities(calendar, tags);
        let { oldRecipes, newRecipes, breakfastRecipes } = splitRecipes(recipes);

        // Sort the recipes
        oldRecipes.sort(sort);
        newRecipes.sort(sort);
        breakfastRecipes.sort(sort);

        // Return the top rated of each category
        return {
            old: oldRecipes.slice(0, 5),
            new: newRecipes.slice(0, 5),
            breakfast: breakfastRecipes.slice(0, 3)
        }
    });
}

/**
 * Gets the number of days since each type of recipe has appeared in
 * the calendar.
 * @param {Array} calendar Calendar of recipes
 * @param {Array} tags Recipe tags
 * @returns Object containing all tags and their temporal proximities
 */
function getTagProximities (calendar, tags) {
    // Create an object to hold the tags and dates
    const tagProximities = {};

    // Convert the calendar's dates into Date objects
    calendar.forEach(day => {
        day.date = new Date (new Date(day.date.replace(/-/g, "\/").replace(/T.+/, "")).setHours(0,0,0,0));
    });

    // Get today's date and a default date, one day before the calendar starts
    let todaysDate = new Date(new Date().setHours(0, 0, 0, 0));
    let defaultDate = calendar[0].date;
    defaultDate.setDate(defaultDate.getDate() - 1);

    // Set the default proximity for each tag
    let defaultProximity = (todaysDate - defaultDate) / (1000 * 3600 * 24);
    tags.forEach(tag => {
        tagProximities[tag] = defaultProximity;
    });

    // Iterate through the calendar to get the most recent occurance of each tag
    calendar.forEach(day => {
        day.tags.forEach(tag => {
            tagProximities[tag] = Math.max((todaysDate - day.date) / (1000 * 3600 * 24), 0);
        });
    });

    return tagProximities;
}

/**
 * Categorizes recipes into old, new, and breakfast.
 * @param {Array} recipes All recipes
 * @returns Old recipe, new recipe, and breakfast recipe arrays
 */
function splitRecipes (recipes) {
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

    return { oldRecipes, newRecipes, breakfastRecipes };
}

/**
 * Uses the getScore sorting algorithm to sort recipes
 */
function sort (a, b) {
    return getScore(b) - getScore(a);
}

/**
 * Factors in tag proximities and previous ratings to rate
 * a given recipe.
 * @param {Object} recipe Recipe to evaluate
 * @returns Score for the given recipe
 */
function getScore (recipe) {
    // Get the average tag proximity
    let avgTag = 0;
    recipe.tags.forEach(tag => {
        avgTag += tagProximities[tag];
    });
    avgTag /= recipe.tags.length;

    // Get the median tag proximitiy
    let sortedProximities = [...recipe.tags].sort((a, b) => tagProximities[a] - tagProximities[b]);
    let half = Math.floor(recipe.tags.length / 2);
    let medTag = (recipe.tags.length % 2) ? sortedProximities[half] : (sortedProximities[half - 1] + sortedProximities[half]) / 2;

    // Get the total rating score
    let rating = (recipe.aRating || 0) + (recipe.jRating || 0) + (recipe.hRating || 0);

    // Weight and add the two factors
    return ((avgTag + 3 * medTag) / 4) + (2 * rating);
}

const suggestions = {
    getSuggestions
};
export default suggestions;