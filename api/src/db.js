import Sequelize from "sequelize";
import { DB } from "./object";
import dotenv from "dotenv";
import { indexModels } from "./models/index";
dotenv.config();
const {DB_URL} = process.env;


// se crea una instancia de sequelize y 
// se crea una instancia de la clase DB.
const sequelize = new Sequelize(DB_URL,{
    logging: false,
    native: false
});
export const db = new DB(sequelize);

// los modelos
indexModels(db);

// Create relationship 

//-------- relation one to many (category and operation) --------

db.getModel('category').hasMany(db.getModel('operation'));
db.getModel('operation').belongsTo(db.getModel('category'));

//-------- relation one to many (user and operation) --------

// db.getModel('user')


// exportamos la base de datos
export default  db;