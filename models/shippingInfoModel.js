import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import User from "./userModel.js";

const ShippingInfo = db.define('shipping_info', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    country: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },

    city: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },

    state: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },

    address: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true
        }
    },

    phone: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },

    zipCode: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
            notEmpty: true,
        }
    },
}, {
    timestamps: false
})

User.hasOne(ShippingInfo, {
    foreignKey: 'userId'
})

ShippingInfo.belongsTo(User)


export default ShippingInfo