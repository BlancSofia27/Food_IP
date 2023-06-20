const { Op } = require('sequelize');
const { Recipe, Diet } = require('../db');
const axios = require ('axios');
require ('dotenv').config();
const {
    API_KEY1,
  } = process.env;
  //const URL = 'https://api.spoonacular.com/recipes/complexSearch'

  const createRecipe = async ({ title, img, summary, health_score, step_by_step, diets }) => {
    const post = await Recipe.create({ title, img, summary, health_score, step_by_step })
    if (diets && diets.length > 0) {
        const foundDiets = await Diet.findAll({ //para buscar todas las dietas que queremos asociar a la receta
            where: { name: diets }
        })
        await post.addDiets(foundDiets)//para asociar esas dietas a la receta
    }

    return post //representa la receta creada y asociada a las dieta en la DB
}



  const getRecipesByName = async (title) => { //obtiene las recetas filtradas por su nombre
    //const recipesAPI = await axios(`https://api.spoonacular.com/recipes/complexSearch?titleMatch=${title}&apiKey=${API_KEY1}&addRecipeInformation=true`)
    const recipesAPI = await axios(`http://localhost:8081/recipes/complexSearch?titleMatch=${title}&apiKey=${API_KEY1}&addRecipeInformation=true`)
    const api = recipesAPI.data.results;
  
    const recipesDB = await Recipe.findAll({ //para buscar en la DB todas las recetas
      include: {
        model: Diet, //para obtener las dietas asociadas a cada receta
      }
    }).then(data => data.map(api => { //para transformar el formato de las recetas
      return {
        id: api.id,
        title: api.title,
        img: api.image,
        summary: api.summary,
        health_score: api.healthScore,
        step_by_step: api.steps,
        diets: api.diets.map(diet => diet.name)
      }
    }))
  
    const allRecipes = api.concat(recipesDB) //combinamos las recetas de la API con las de la DB
    const filtername = allRecipes.filter((api) => api.title.toLowerCase().includes(title.toLowerCase()) //filtro las recetas de la api + DB
    );
  
  
    return filtername
  
  }
 


  const getRecipeById = async (id) => {
    
    let formatDetail; //para almacenar el detalle de la receta
    if (!id.includes("-")) { //verifica si el ID no incluye un caracter no numerico
      const response = await axios.get(
        //`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_KEY1}`
        `http://localhost:8081/recipes/${id}/information?apiKey=${API_KEY1}`
      );
      const api = response.data; //se almacenan los datos en api
      formatDetail = {
        id: api.id,
        title: api.title,
        img: api.image,
        summary: api.summary,
        health_score: api.healthScore,
        step_by_step: api.instructions,
        diets: api.diets.map(diet => { //mapeo las dietas para obtener el nombre de cada dieta
          return {
            name: diet
          }
        })
      }
    } else {
      formatDetail = await Recipe.findOne({ //para buscar la receta el la DB que coincida con el id
        where: {
          id: id
        }, include: {
          model: Diet,
          attributes: ['name'],
          through: {
            attributes: []
          }
        }
      });
    }
    return formatDetail
  }

  const getAllRecipes = async () => { //obtiene todas las recetas(sin filtros)
    //const details = await axios(`${URL}?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`)http://localhost:8081
    const details = await axios(`http://localhost:8081/recipes/complexSearch?addRecipeInformation=true&number=100&apiKey=${API_KEY1}`)
    const detailsDB = await Recipe.findAll({
      include: {
        model: Diet,
      }
    }).then(data => data.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        img: recipe.image,
        summary: recipe.summary,
        health_score: recipe.healthScore,
        step_by_step: recipe.instructions,
        diets: recipe.diets.map(diet => diet.name)
      }
    }))
  
    return [...detailsDB, ...details.data.results]
  }

  
  
  



module.exports= {
    
    getAllRecipes,
    getRecipesByName,
    getRecipeById,
    createRecipe,
};
