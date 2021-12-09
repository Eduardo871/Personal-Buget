import Sequelize from "sequelize";
import { DB } from "./object";
import dotenv from "dotenv";
import { indexModels } from "./models/index";
dotenv.config();
const {URL} = process.env;



// se crea una instancia de sequelize y 
// se crea una instancia de la clase DB.
const sequelize = new Sequelize(URL,{
    logging: false,
    native: false
});
export const db = new DB(sequelize);

// los modelos
indexModels(db);




// exportamos la base de datos
export default  db;