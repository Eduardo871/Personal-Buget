import db from "../db";

export const createOperation = async (req, res) => {
    try {
        const sequelize = db.getConection();
        const {type, amount, concept, date} = req.body.content;
        
        if(type === "income"){
            const operation = await db.getModel('operation').create({type, amount, concept, date});
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
                const operation = await db.getModel('operation').create({type, amount, concept, date});
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