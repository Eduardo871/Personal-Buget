export class App {
    constructor(app, Router){
        this.app = app;
        this.Router = Router;
    }
    start(sequelize){
        sequelize.sync({force: false})
        .then (() => {
            this.app.listen(3001, console.log("Listen to port 3001"))
        })
    }
    createRoute(method, route, controller){
        this.app[method](route, controller);
    } 
    createMiddleware(middleware){
        this.app.use(middleware);
    }

}

export class DB {
    constructor(sequelize){
        this.sequelize = sequelize;
        this.models = [];
    }
    async createModel(nameModel, attributesModel){
        const model = await this.sequelize.define(nameModel, attributesModel);
        return model;
    }
    setModel(models){
         this.models = models;
    }
    getAllModels(){
        return this.models;
    }
    getModel(name){
        return this.sequelize.models[name]
    }
    getConection(){
        return  this.sequelize;
    }
}
