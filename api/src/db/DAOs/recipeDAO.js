const db = require("../DBConnection");
const Recipe = require("../models/Recipe");

/**
 * Takes in Recipes and adds their tags/history
 * @param {Recipe Array} recipes Recipes to create
 * @returns Recipe objects with tags and dates
 */
function getRecipesHelper (recipes) {
    // Create a list of promises
    const promises = [];

    // Get each recipe"s tags, adding the promise to the array
    recipes.forEach(recipe => {
        promises.push(db.query("SELECT tag_name_fk FROM recipe_tags WHERE recipe_id_fk = ?", [recipe.id]).then(({results}) => {
            recipe.tags = [];
            results.forEach(tag => {
                recipe.tags.push(tag.tag_name_fk);
            });
        }));
    });

    // Get each recipe"s calendar data
    recipes.forEach(recipe => {
        promises.push(db.query("SELECT date from calendar WHERE recipe_id_fk = ? ORDER BY date", [recipe.id]).then(({results}) => {
            recipe.history = [];
            results.forEach(date => {
                recipe.history.push(date.date);
            });
        }));
    });

    // Return the recipes once they"ve all resolved
    return Promise.all(promises).then(() => {
        return recipes;
    });
}

/**
 * Gets all recipes
 * @returns All recipes
 */
function getRecipes () {
    return db.query("SELECT * FROM recipes").then(({results}) => {
        return getRecipesHelper(results.map(recipe => new Recipe(recipe)));
    });
}

/**
 * Gets the recipe with the given ID
 * @param {Number} id ID of the recipe to retrieve
 * @returns Recipe with the given ID
 */
function getRecipeById (id) {
    return db.query("SELECT * FROM recipes WHERE recipe_id = ?", [id]).then(({results}) => {
        return getRecipesHelper(results.map(recipe => new Recipe(recipe)));
    });
}

/**
 * Gets all similar recipes, where similar recipes are defined as having 2 or more common
 * tags with the given recipe.
 * @param {Number} id ID of the recipe for which to find similar recipes
 * @returns Similar recipes
 */
function getSimilarRecipes (id) {
    return db.query("SELECT * FROM recipes JOIN (SELECT recipe_id FROM (SELECT B as recipe_id, COUNT(*) AS count FROM (SELECT a.recipe_id_fk AS A, b.recipe_id_fk AS B FROM recipe_tags AS a INNER JOIN recipe_tags AS b ON a.tag_name_fk = b.tag_name_fk WHERE a.recipe_id_fk != b.recipe_id_fk) I WHERE A = ? GROUP BY B) J WHERE count > 1) K ON recipes.recipe_id = K.recipe_id", [id]).then(({results}) => {
        return getRecipesHelper(results.map(recipe => new Recipe(recipe)));
    });
}

/**
 * Adds the given recipe to the database
 * @param {Object} recipe Recipe to insert
 * @returns Newly created recipe
 */
function addRecipe (recipe) {
    // First insert into the recipes table and get the recipe_id
    return db.query("INSERT IGNORE INTO recipes (recipe_name, a_rating, j_rating, h_rating) VALUES (?, ?, ?, ?) RETURNING recipe_id;", [recipe.name, recipe.aRating, recipe.jRating, recipe.hRating]).then(({results}) => {
        // Get the id of the new recipe
        const id = results[0] && results[0].recipe_id;

        // Create an array of promises
        const promises = [];

        // Insert each tag
        recipe.tags.forEach(tag => {
            promises.push(db.query("INSERT IGNORE INTO recipe_tags (recipe_id_fk, tag_name_fk) VALUES (?, ?)", [id, tag]).then(() => {
                return;
            }));
        });

        // Once all of the insertions are done, get the new full recipe
        return Promise.all(promises).then(() => {
            return getRecipeById(id);
        });
    });
}

/**
 * Updates the name, tags, and ratings of the given recipe
 * @param {Number} id ID of the recipe to update
 * @param {Object} recipe Updated recipe object
 * @returns Updated recipe
 */
function updateRecipe (id, recipe) {
    // Set the name and ratings
    return db.query("UPDATE recipes SET recipe_name = ?, a_rating = ?, j_rating = ?, h_rating = ? WHERE recipe_id = ?", [recipe.name, recipe.aRating, recipe.jRating, recipe.hRating, id]).then(() => {
        // Remove all tags
        return db.query("DELETE FROM recipe_tags WHERE recipe_id_fk = ?", [id]).then(() => {
            // Create an array of promises
            const promises = [];

            // Insert the tags back into the table
            recipe.tags.forEach(tag => {
                promises.push(db.query("INSERT IGNORE INTO recipe_tags (recipe_id_fk, tag_name_fk) VALUES (?, ?)", [Number(id), tag]).then(() => {
                    return;
                }));
            });

            // Return the updated recipe once the tags have been inserted
            return Promise.all(promises).then(() => {
                return getRecipeById(id);
            });
        });
    });
}

module.exports = {
    getRecipes: getRecipes,
    getRecipeById: getRecipeById,
    getSimilarRecipes: getSimilarRecipes,
    addRecipe: addRecipe,
    updateRecipe: updateRecipe
};