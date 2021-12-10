import {STRING, INTEGER, ENUM} from "sequelize";

export const user = (db) => {
    db.createModel('user', {
        fullname: {
            type: STRING,
            allowNull: false,
        },
        email: {
            type: STRING(500),
            allowNull: false,
            unique: true,
            validate:{
                isEmail: {
                    args: true,
                    msg: 'It must be an email'
                }
            }
        }, 
        password: {
            type: STRING,
            allowNull: false,
        }, 
        image: {
            type: STRING,
            allowNull: true,
            validate: {
                isUrl: {
                    args: true,
                    msg: 'It must be an url'
                }
            }
        }
    });
    
}


// validate : { 
//     is:{
//         args: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/,
//         msg: 'The password must contain between 6 and 20 characters at least one uppercase and at least one lowercase.'
//     }
// }