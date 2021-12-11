import {STRING, INTEGER, ENUM, DATE} from "sequelize";

export const operation = (db) => {
    return db.createModel('operation', {
        type: {
            type: ENUM("income", "expense"),
            allowNull: false,
        },
        concept: {
            type: STRING,
            allowNull: false
        },
        amount: {
            type: INTEGER,
            allowNull: false,
            validate: {
            min : {
                args: 1,
                msg: 'The number must be greater than or equal to one'
            }
            }
        },
        date: {
            type: DATE,
            allowNull: false
        }
    })
}