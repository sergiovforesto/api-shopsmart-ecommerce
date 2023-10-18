import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";


const Product = db.define('products', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 40],
            notEmpty: true
        }
        
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 255],
            notEmpty: true
        }
    },
    price: {
        type: DataTypes.DECIMAL,
        allowNull: false,
        defaultValue: 0,
        validate: {
            isDecimal: true
        }
        
    },
    imageUrl: {
        type: DataTypes.STRING,
    },

    color: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [2, 20],
        }
    },

    stock: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },

    discount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true
        }
    },

    freeShipping: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false
    },


    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
            isInt: true,
            max: 5
        }
    },


    

    
},{
    timestamps: false
})



export default Product