import db from "../db";

export const createOperation = async (req, res) => {
    try {
        const sequelize = db.getConection();
        const {type, amount} = req.body.content;
        
        if(type === "income"){
            const operation = await db.getModel('operation').create(req.body.content);
            return res.send({content: operation, message: "Operation registered successfully"});
        }else if (type === "expense"){
            const queryExpense = "SELECT SUM(amount) FROM operations WHERE type='expense'";
            const queryIncome = "SELECT SUM(amount) FROM operations WHERE type='income'";
            let totalExpense = await sequelize.query(queryExpense);
            let totalIncome = await sequelize.query(queryIncome);
            totalExpense = totalExpense[0][0].sum === null ? (0):(totalExpense[0][0].sum);
            totalIncome = totalIncome[0][0].sum === null ? (0):(totalIncome[0][0].sum);
            const total = Number(totalIncome) - (Number(totalExpense) + Number(amount));
            
            if( total >= 0){
                const operation = await db.getModel('operation').create(req.body.content);
                return res.send({content: operation, message: "Operation registered successfully"});
            }else{
                return res.status(400).send({content:[], message:"The available amount of money has been exceeded"})
            }
        }
        res.status(400).send({content:error, message:"The operation could not be performed"})

    } catch (error) {
       return  res.status(400).send({content:error, message:"The operation could not be performed"})
    }
}

export const updateOperation = async (req, res) => {
    const idOperation = req.query.id;
    const content = req.body.content;
    const sequelize = db.getConection();
    try {
        const operation = await db.getModel('operation').findByPk(idOperation);
        const queryExpense = "SELECT SUM(amount) FROM operations WHERE type='expense'";
        const queryIncome = "SELECT SUM(amount) FROM operations WHERE type='income'";
        let totalExpense = await sequelize.query(queryExpense);
        let totalIncome = await sequelize.query(queryIncome);
        totalExpense = totalExpense[0][0].sum === null ? (0):(totalExpense[0][0].sum);
        totalIncome = totalIncome[0][0].sum === null ? (0):(totalIncome[0][0].sum);
        console.log(content.amount, content.type)
        if(content.amount && content.type && content.type === "expense"){
            console.log("Entre")
            const total = Number(totalIncome) - (Number(totalExpense) + Number(content.amount));
            if(total >= 0){
                const updated = await operation.update(content);
               return res.send({content: updated, message: "The operation updated successfully"});          
            }else{
               return res.status(400).send({content: [], message:"The available amount of money has been exceeded"})
            }
        }else if(content.type && content.type === "expense"){
            const total = Number(totalIncome) - (Number(totalExpense) + Number(operation.amount));

            if(total >= 0){
                const updated = await operation.update(content);
               return  res.send({content: updated, message: "The operation updated successfully"});          
            }else{
               return res.status(400).send({content: [], message:"The available amount of money has been exceeded"})
            }
        }

        const updated = await operation.update(content);
        res.send({content: updated, message: "The operation updated successfully"});

    } catch (error) {
        res.status(400).send({content: error, message: "The operation updated faild"})
    }
}


export const deleteOperation = async (req, res) => {
    const idOperation = req.query.id;
    try {
        const operation = await db.getModel('operation').findByPk(idOperation);
        const deleted = await operation.destroy();
        res.send({content: deleted, message:"The operation deleted successfully"})
    } catch (error) {
        res.status(400).send({content: error, message: "The operation deleted faild"})
        
    }
}


export const gettingOperation = async (req, res) => {
    const {type, category, order, limit} = req.query;
    
    
    const ORDER = !order && (order !== "ASC" || order !== "DES") ?("ASC"):(order);
    const CATEGORY = !category ? ({}):({id:Number(category)});
    const TYPE = !type ? ({}):({type})
    const LIMIT = !limit ? (10):(Number(limit))
    
    try {
        const categoryModel = await db.getModel('category');
        const operations = await db.getModel('operation').findAll(
            {
                where: {
                     ...TYPE
                },
                include: {
                    model: categoryModel,
                    where: {
                       ...CATEGORY
                    }
                },
                limit: LIMIT,
                order:[
                    ["amount", ORDER],
                ] 

            }
        );
        res.send({content: operations, message:"The operations getting successfuly"})
    } catch (error) {
        res.status(400).send({content: error, message:"The operations getting faild"})
    }
}

export const gettingTotal = async (req, res) => {
    const sequelize = db.getConection();
    const queryIncome = "SELECT SUM(amount) FROM operations WHERE type='income'";
    const queryExpense = "SELECT SUM(amount) FROM operations WHERE type='expense'";
    
    try {
        let totalIncome = await sequelize.query(queryIncome);
        let totalExpense = await sequelize.query(queryExpense);
        totalExpense = totalExpense[0][0].sum === null ? (0):(totalExpense[0][0].sum);
        totalIncome = totalIncome[0][0].sum === null ? (0):(totalIncome[0][0].sum);
        const TOTAL =  totalIncome - totalExpense; 
        res.send({content: TOTAL, message:"The operations total getting successfuly"})
    } catch (error) {
        res.send({content: error, message:"The operations total getting faild"})
    }
}