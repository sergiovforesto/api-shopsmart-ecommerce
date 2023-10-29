import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import Product from "./productModel.js";


const Collection = db.define('collections', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30],
            notEmpty: true
        }
    },

    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 30],
            notEmpty: true
        }
    },

    
}, {
    timestamps: false
})

Collection.hasMany(Product, {
    foreignKey: 'collectionId'
})
Product.belongsTo(Collection)

export default Collection