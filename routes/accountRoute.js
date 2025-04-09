// Needed Resources 
const express = require("express");
const router1 = new express.Router();
const accController = require("../controllers/accountController");
const utilities = require("../utilities/");

// Route to build login view
router1.get("/login", utilities.handleErrors(accController.buildLogin));

// Route to build register view
router1.get("/register", utilities.handleErrors(accController.buildRegister));

module.exports = router1;