import {Sequelize} from 'sequelize'

const db = new Sequelize('shopsmartdb', 'root', 'sangabriel56-', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db