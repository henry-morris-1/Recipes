module.exports = class Recipe {
    id = null;
    name = null;
    isNew = null;
    aRating = null;
    jRating = null;
    hRating = null;
    avgRating = null;
    history = null;
    tags = null;

    constructor (data) {
        this.id = data.recipe_id;
        this.name = data.recipe_name;
        this.isNew = data.is_new;
        this.aRating = data.a_rating;
        this.jRating = data.j_rating;
        this.hRating = data.h_rating;
        this.avgRating = (data.a_rating + data.j_rating + data.h_rating) / 3;
    }
}