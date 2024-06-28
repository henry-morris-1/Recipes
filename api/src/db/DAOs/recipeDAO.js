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

function getRecipes () {
    return db.query("SELECT * FROM recipes").then(({results}) => {
        return getRecipesHelper(results.map(recipe => new Recipe(recipe)));
    });
}

function getRecipeById (id) {
    return db.query("SELECT * FROM recipes WHERE recipe_id = ?", [id]).then(({results}) => {
        return getRecipesHelper(results.map(recipe => new Recipe(recipe)));
    });
}

function getSimilarRecipes (id) {
    return db.query("SELECT * FROM recipes JOIN (SELECT recipe_id FROM (SELECT B as recipe_id, COUNT(*) AS count FROM (SELECT a.recipe_id_fk AS A, b.recipe_id_fk AS B FROM recipe_tags AS a INNER JOIN recipe_tags AS b ON a.tag_name_fk = b.tag_name_fk WHERE a.recipe_id_fk != b.recipe_id_fk) I WHERE A = ? GROUP BY B) J WHERE count > 1) K ON recipes.recipe_id = K.recipe_id", [id]).then(({results}) => {
        return getRecipesHelper(results.map(recipe => new Recipe(recipe)));
    });
}

function addRecipe (recipe) {
    return db.query("INSERT IGNORE INTO recipes (recipe_name, a_rating, j_rating, h_rating) VALUES (?, ?, ?, ?) RETURNING recipe_id;", [recipe.name, recipe.aRating, recipe.jRating, recipe.hRating]).then(({results}) => {
        id = results[0] && results[0].recipe_id;
        const promises = [];

        recipe.tags.forEach(tag => {
            promises.push(db.query("INSERT IGNORE INTO recipe_tags (recipe_id_fk, tag_name_fk) VALUES (?, ?)", [id, tag]).then(() => {
                return;
            }));
        });

        return Promise.all(promises).then(() => {
            return getRecipeById(id);
        });
    });
}

function updateRecipe (id, recipe) {
    return db.query("UPDATE recipes SET recipe_name = ?, a_rating = ?, j_rating = ?, h_rating = ? WHERE recipe_id = ?", [recipe.name, recipe.aRating, recipe.jRating, recipe.hRating, id]).then(() => {
        return getRecipeById(id);
    });
}

module.exports = {
    getRecipes: getRecipes,
    getRecipeById: getRecipeById,
    getSimilarRecipes: getSimilarRecipes,
    addRecipe: addRecipe,
    updateRecipe: updateRecipe
};