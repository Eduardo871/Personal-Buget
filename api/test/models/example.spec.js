import db from "../../src/db";
import { expect } from "chai";
const database = db.sequelize;

// TEST DEL MODELO CHRACTER

const characters = [
    {

    }
]
describe('Testing the character table', ()=> {
    before(()=> {
        database.sync({force: true});
    });
    it('There should be a table called character', done => {
        const name  = !database.models.character ?(undefined):(database.models.character.name)
        expect(name).to.equal('character')
        done()
    });
    it('Must require the necessary fields', done => {
        
    })
    
})

