import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import User from "./userModel.js";
import { hashPassword } from "../utils/hashPassword.js";

const Payment = db.define('payments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    fullName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    exp: {
        type: DataTypes.STRING,
        allowNull: false
    },

    cvv: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    cardNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value) {
            this.setDataValue('cardNumber', hashPassword(value))
        }
    }

}, {
    timestamps: false
})

User.hasOne(Payment, {
    foreignKey: 'userId'
})

Payment.belongsTo(User)

export default Payment