const { Router } = require('express');
const {
    getRecipesNameHandler,
    getRecipesIdHandler,
    postRecipeHandler,
    getAllRecipesHandler,
} = require('../handlers/recipesHandlers')

//const validate = require('../middlewares/validations')


//RecipesRouter.get('/', getRecipesHandler)

const RecipesRouter = Router();

RecipesRouter
  .get("/name",getRecipesNameHandler)
  .get("/:id",getRecipesIdHandler)
  .get("/",getAllRecipesHandler)
  .post("/postRecipe",postRecipeHandler)
  


module.exports = RecipesRouter;


