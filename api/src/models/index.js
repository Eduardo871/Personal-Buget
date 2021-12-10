import fs from 'fs';

const path = __dirname;

export const indexModels = (db) => {    
    const filesModels = fs.readdirSync(path);
    const functionModels = [];
    for (let index = 0; index < filesModels.length; index++) {
        const element = filesModels[index];
        if(element !== 'index.js'){
            const nameModel = element.slice(0,-3)
            functionModels.push(require(`${path}/${element}`)[nameModel](db))
        }
    }
    
        
}