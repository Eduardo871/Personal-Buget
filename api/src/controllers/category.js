import db from "../db";

export const createCategory = async (req, res) => {
    const {name} = req.body.content;
    try {
        if(!name){
            res.status(400).send({content:[], message:"You should send the attribute name"})
        }else{
            const category = await db.getModel('category').create({name});
            res.send({content: category, message:"The category created successfully"})
        }
        
    } catch (error) {
        res.status(400).send({content: error, message:"The category created faild"})
    }
}
export const updateCategory = async (req, res) => {
    const idCategory = req.query.id;
    const {name} = req.body.content;
    try {
        if(!name){
            res.status(400).send({content:[], message:"You should send the attribute name"})
        }else{
            const category = await db.getModel('category').findByPk(idCategory);
            const updated = await category.update({name});
            res.send({content:updated, message: "The category updated successfully"});
        }
    } catch (error) {
        res.status(400).send({content: error, message: "The category updated faild"});

    }
}
export const deleteCategory = async (req, res) => {
    const idCategory = req.query.id;
    try {
        const category = await db.getModel('category').findByPk(idCategory);
        const deleted = await category.destroy();
        res.send({content:deleted, message: "The category deleted successfully"})
    } catch (error) {
        res.status(400).send({content:error, message: "The category deleted faild"}) 
    }
}
