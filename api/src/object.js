export class App {
    constructor(app){
        this.app = app;
    }
    start(sequelize){
        sequelize.sync({force: false})
        .then (() => {
            this.app.listen(3000, console.log("Listen to port 3000"))
        })
    }
    createRoute(method, route, controller){
        app[method](route, controller)
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
