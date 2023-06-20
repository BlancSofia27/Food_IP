const { saveDietsInDb} = require('../controllers/DietsControllers')


const getDietsHandler = async (req, res)=> {
    
    try {
        const allDiets = await saveDietsInDb();
        console.log(allDiets)
        return res.status(200).json(allDiets);
      } catch (error) {
        return res.status(400).send(error.message);
      }
    }



module.exports={
    getDietsHandler,
}