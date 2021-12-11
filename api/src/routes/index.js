import { createCategory, deleteCategory, updateCategory } from "../controllers/category";
import { createOperation, deleteOperation, gettingOperation, gettingTotal, updateOperation } from "../controllers/operation"


export const routes = (app) => {

//-------------------------- OPERATION ---------------------------------
    
    // route for create a operation
    app.createRoute('post','/operation/create', createOperation);

    // route for update a operation
    app.createRoute('put', '/operation/update', updateOperation);

    // route for delete a operation
    app.createRoute('delete', '/operation/delete', deleteOperation);
 
    // route for getting a operation
    app.createRoute('get','/operation', gettingOperation);

    // route for getting a total 
    app.createRoute('get','/operation/total', gettingTotal);

//-------------------------- CATEGORY ---------------------------------
    
    // route for create a category
    app.createRoute('post', '/category/create', createCategory);

    // route for update a category
    app.createRoute('put','/category/update', updateCategory);

    // route for delete a category
    app.createRoute('delete','/category/delete', deleteCategory);

//-------------------------- USER -------------------------------------

}