
const  {
  
   getRecipesByName, 
   getRecipeById,
   getAllRecipes,
   createRecipe,
  } = require('../controllers/RecipesControllers')




const getRecipesNameHandler = async (req, res) => {
  try {
      if (req.query.name !== undefined) {
          const recipes = await getRecipesByName(req.query.name)
          res.status(200).json(recipes)
      } else {
          
          res.status(401).send('no se encontro la receta')
      }
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
}

  

const  getRecipesIdHandler = async (req, res) => {
  try {
      const detailRecipe = await getRecipeById(req.params.id)
      res.status(200).json(detailRecipe)
  } catch (error) {
      res.status(400).json('no anda')
  }
}

    

    
      const postRecipeHandler = async (req, res) => {
        try {
            const newRecipe = await createRecipe(req.body)
            res.status(200).json(newRecipe)
        } catch (error) {
            res.status(400).json({ error: error.message })
        }
    }


    const getAllRecipesHandler = async (req, res) => {
      try {
              const recipes = await getAllRecipes()
              res.status(200).json(recipes)
      } catch (error) {
          res.status(400).json({ error: error.message });
      }
  }
module.exports={
   getRecipesNameHandler,
   getRecipesIdHandler, 
   postRecipeHandler,
   getAllRecipesHandler,

}