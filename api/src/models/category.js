import {STRING } from "sequelize";

export const category = (db) => {
    return db.createModel('category', {
        name: {
            type: STRING
        }
    })
}