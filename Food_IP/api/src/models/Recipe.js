const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {

sequelize.define('Recipe',{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      
    },
    title:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    img:{
      type: DataTypes.STRING,
      allowNull: false,
    },
    health_score:{
      type: DataTypes.ENUM("1","2","3","4","5"),
      allowNull: false,
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    step_by_step:{
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {timestamps: false}
  );
};
