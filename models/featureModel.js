import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import Product from "./productModel.js";

const ProductFeatures = db.define('product_features', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 30]
        }
    },

    value: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 30]
        }
    },

}, {
    timestamps: false
})
Product.hasMany(ProductFeatures, {
    foreignKey: 'productId'
})
ProductFeatures.belongsTo(Product)


export default ProductFeatures