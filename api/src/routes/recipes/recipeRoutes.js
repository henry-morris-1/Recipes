/** Set up the router */
const express = require("express");
const cookieParser = require("cookie-parser");

const router = express.Router();
router.use(cookieParser());

/** Import recipe DAO */
const recipeDAO = require("../../db/DAOs/recipeDAO");

/**
 * Get all recipes
 */
router.get("/", (req, res) => {
    recipeDAO.getRecipes().then(recipes => {
        if (recipes) {
            res.status(200).json(recipes);
        } else {
            res.status(404).json({ error: "No recipes found" });
        }
    });
});

/**
 * Get a recipe by its id
 */
router.get("/:recipeId", (req, res) => {
    const recipeId = req.params.recipeId;

    recipeDAO.getRecipeById(recipeId).then(recipe => {
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    });
});

/**
 * Get recipes with intersecting tags
 */
router.get("/:recipeId/similar", (req, res) => {
    const recipeId = req.params.recipeId;

    recipeDAO.getSimilarRecipes(recipeId).then(recipes => {
        if (recipes) {
            res.status(200).json(recipes);
        } else {
            res.status(404).json({ error: "No recipes found" });
        }
    });
});

/**
 * Update a recipe with the given id
 */
router.put("/:recipeId", (req, res) => {
    const recipeId = req.params.recipeId;
    const recipe = req.body;

    console.log(recipe);

    recipeDAO.updateRecipe(recipeId, recipe).then(recipe => {
        if (recipe) {
            res.status(200).json(recipe);
        } else {
            res.status(404).json({ error: "Recipe not found" });
        }
    });
});

module.exports = router;