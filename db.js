const express = require("express");
const { Sequelize } = require("sequelize");
const app = express(); 
  

const sequelize = new Sequelize('payfee', 'admin', 'payfree390', {
  host: 'payfree.c8mhl3xokyfq.us-east-1.rds.amazonaws.com',
  dialect: "mysql",
  dialectOptions: {
    connectTimeout: 600000, // Set the timeout value in milliseconds
  },
});

// Test the database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);
  });

module.exports = sequelize;
