import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import Product from "./productModel.js";

const ProductFeatures = db.define('product_features', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    first: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },

    firstValue: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },

    second: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },

    secondValue: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },


    third: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },

    thirdValue: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },


    fourth: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },

    fourthValue: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },


    fifth: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
        }
    },

    fifthValue: {
        type: DataTypes.STRING,
        validate: {
            len: [1, 60]
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