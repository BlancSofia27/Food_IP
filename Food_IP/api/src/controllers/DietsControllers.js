//const { Op } = require("sequelize");
const axios = require("axios");
const { Diet} = require("../db");
//const Recipe = require("../models/Recipe");
const {
    API_KEY1,
  } = process.env;
  

  const saveDietsInDb = async ()=> {
    try{
    
      //const response = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`);
      const response = await axios.get(`http://localhost:8081/recipes/complexSearch?apiKey=${API_KEY1}&addRecipeInformation=true&number=100`);
      const { data } = response;
      const diets = data.results.flatMap(recipe => recipe.diets);
      const uniqueDiets = [...new Set(diets)];
      
      await Promise.all(
        uniqueDiets.map(async diet => {
          await Diet.findOrCreate({
            where: { name: diet },
          });
        })
      );
  
       
      return uniqueDiets;
  } catch (error) {
      throw Error ("Error fetching diets from API");
    }
  };

  
  
  async function giveMeAllDiets() {
    
    const allDiets = await Diet.findAll(); //consulto la base de datos para obtener todos los registors de la tabla diets
    return allDiets;
  }

module.exports = { saveDietsInDb, giveMeAllDiets};