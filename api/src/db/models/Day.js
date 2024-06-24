module.exports = class Day {
    date = null;
    recipeId = null;
    recipeName = null;

    constructor (data) {
        this.date = data.date;
        this.recipeId = data.recipe_id;
        this.recipeName = data.recipe_name;
    }
}