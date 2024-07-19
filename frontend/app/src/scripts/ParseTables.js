import fs from "fs";

let recipes = [];
let tags = [];
let calendar = [];

fs.readFile("Tags.tsv", function (err, data) {
    tags = data.toString().split("\r\n");
    tags.shift();
    tags.sort();

    let tagsFile = "DELETE FROM `tags`\;\nINSERT INTO `tags` (`tag_name`) VALUES\n";
    tags.forEach((tag, i) => {
        tagsFile += `        ('${tag}')`;
        tagsFile += (i < tags.length - 1) ? ",\n" : ";";
    });
    fs.writeFile("tags.txt", tagsFile, err => {});
});

fs.readFile("Recipes.tsv", function (err, data) {
    const lines = data.toString().split("\r\n");
    lines.shift();

    lines.forEach(line => {
        let split = line.split("\t");

        let rTags = [];
        split[2].split(",").forEach(tag => {
            let fTag = tag.trim().replace(/\"/ig, "");

            if (!tags.includes(fTag)) {
                console.log("Tag '" + fTag + "' for recipe #" + split[0] + " is not valid!");
            }

            rTags.push(fTag);
        });

        recipes.push({
            id: split[0],
            name: split[1],
            tags: rTags,
            aRating: split[3] || "NULL",
            jRating: split[4] || "NULL",
            hRating: split[5] || "NULL"
        });
    });

    let recipeFile = "DELETE FROM `recipes`\;\nINSERT INTO `recipes` (`recipe_id`, `recipe_name`, `a_rating`, `j_rating`, `h_rating`) VALUES\n";
    recipes.forEach((recipe, i) => {
        recipeFile += `        (${recipe.id}, '${recipe.name}', ${recipe.aRating}, ${recipe.jRating}, ${recipe.hRating})`;
        recipeFile += (i < recipes.length - 1) ? ",\n" : ";";
    });
    fs.writeFile("recipes.txt", recipeFile, err => {});

    let recipeTagsFile = "DELETE FROM `recipe_tags`\;\nINSERT INTO `recipe_tags` (`recipe_id_fk`, `tag_name_fk`) VALUES\n";
    recipes.forEach((recipe, i) => {
        recipe.tags.forEach((tag, j) => {
            recipeTagsFile += `        (${recipe.id}, '${tag}')`;
            recipeTagsFile += (i === recipes.length - 1 && j === recipe.tags.length - 1) ? ";" : ",\n";
        });
    });
    fs.writeFile("recipeTags.txt", recipeTagsFile, err => {});
});

fs.readFile("Calendar.tsv", function (err, data) {
    const lines = data.toString().split("\r\n");
    lines.shift();

    lines.forEach(line => {
        let split = line.split("\t");

        calendar.push({
            date: split[0],
            recipe: split[1] || "NULL"
        });
    });

    let calendarFile = "DELETE FROM `calendar`\;\nINSERT INTO `calendar` (`date`, `recipe_id_fk`) VALUES\n";
    calendar.forEach((day, i) => {
        calendarFile += `        ('${day.date}', ${day.recipe})`;
        calendarFile += (i < calendar.length - 1) ? ",\n" : ";";
    });
    fs.writeFile("calendar.txt", calendarFile, err => {});
});