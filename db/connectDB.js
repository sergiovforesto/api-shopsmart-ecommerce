import {Sequelize} from 'sequelize'

const db = new Sequelize('shopsmartdb', 'root', process.env.ROOT_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
});

export default db