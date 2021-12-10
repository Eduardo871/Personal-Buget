import {STRING } from "sequelize";

export const category = (db) => {
    db.createModel('category', {
        name: {
            type: STRING
        }
    })
}