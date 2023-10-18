import { DataTypes } from "sequelize";
import db from "../db/connectDB.js";
import { hashPassword } from "../utils/hashPassword.js";

const User = db.define('users', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 20,
            min: 3,
            notEmpty: true
        }
        
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            max: 20,
            min: 3,
            notEmpty: true

        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Email invalid'
            },
            notEmpty: true
        }
        
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        },
        set(value) {
            this.setDataValue('password', hashPassword(value))
        }
    },

    confirm: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },

    token: {
        type: DataTypes.STRING,
    },

    role: {
        type: DataTypes.STRING,
        defaultValue: 'customer',
        validate: {
            isIn: [['admin', 'customer']]
        }
    }
   
},{
    timestamps: false
})








export default User