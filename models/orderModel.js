import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import User from "./userModel.js";

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    orderNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },

    dateOrder: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    dateDelivery: {
        type: DataTypes.STRING,
    },

    products: {
        type: DataTypes.JSON,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM,
        defaultValue: 'pending',
        values: ['pending', 'shipped', 'delivered', 'cancelled'],
    },

    subTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }



})


User.hasMany(Order, {
    foreignKey: 'userId'
})

Order.belongsTo(User)


export default Order