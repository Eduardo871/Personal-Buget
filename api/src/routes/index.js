import { createOperation } from "../controllers/operation"


export const routes = (app) => {
    // route for create a operation
    app.createRoute('post','/operation/create', createOperation);
}