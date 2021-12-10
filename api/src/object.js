export class App {
    constructor(app, Router){
        this.app = app;
        this.Router = Router;
    }
    start(sequelize){
        sequelize.sync({force: false})
        .then (() => {
            this.app.listen(3000, console.log("Listen to port 3000"))
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
    }
    async createModel(nameModel, attributesModel){
        const model = await this.sequelize.define(nameModel, attributesModel);
        return model;
    }
    getModel(nameModel){
         return this.sequelize.models[nameModel]
    }
    getConection(){
        return  this.sequelize;
    }
}
