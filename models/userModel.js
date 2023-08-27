const { DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
const sequelize = require("../db.js");

const Users = sequelize.define(
  "Users",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [["mr", "mrs"]],
      },
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    phonenumber: {
      type: DataTypes.STRING,
      primaryKey: true, // Set phonenumber as the primary key
      allowNull: false,
      unique: true,
      validate: {
        is: /^(\+92|92|0)(3\d{9})$/,
      },
    },
    secondaryPhonenumber: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        is: /^(\+92|92|0)(3\d{9})$/,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    newsletter: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    timestamps: false, // Disable the default createdAt and updatedAt columns
  },
  {
    // hooks: {
    //   async beforeCreate(user) {
    //     if (user.password) {
    //       const hashedPassword = await bcrypt.hash(user.password, 12);
    //       user.password = hashedPassword;
    //     }
    //   },
    // },
  }
);
// Users.beforeCreate(async (user) => {
//   const hashedPassword = await bcrypt.hash(user.password, 12);
//   user.password = hashedPassword;
// });
module.exports = Users;
