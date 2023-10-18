import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import User from "./userModel.js";

const Order = db.define('orders', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey: true
    },

    numberOrder: {
        type: DataTypes.CHAR(36),
        defaultValue: DataTypes.UUIDV4
        // allowNull: false
    },

    shippingDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    dateDelivery: {
        type: DataTypes.DATE,
        allowNull: false,
    },

    products: {
        type: DataTypes.JSON,
        allowNull: false,
    },

    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        defaultValue: 'pending',
        values: ['pending', 'shipped', 'delivered', 'cancelled'],

    },

    active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },

    subTotal: {
        type: DataTypes.DECIMAL,
        allowNull: false
    },

    total: {
        type: DataTypes.DECIMAL,
        allowNull: false
    }



}, {
    timestamps: false
})


User.hasMany(Order, {
    foreignKey: 'userId'
})

Order.belongsTo(User)


export default Order