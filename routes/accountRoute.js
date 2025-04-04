// Needed Resources 
const express = require("express");
const router = new express.Router();
const accController = require("../controllers/accountController");
const utilities = require("../utilities/");

// Route to display login view
// Route to build login view
router.get("/login", utilities.handleErrors(accController.buildLogin))

router.get("/broken", utilities.handleErrors(accController.throwError));

/////////////////////////////7

// Needed Resources 
const router1 = new express.Router();
const resistration = require("../controllers/accountController");
const utilities1 = require("../utilities/");

// Route to display login view
// Route to build login view
router.get("/login", utilities1.handleErrors(accController.buildLogin))

router.get("/broken", utilities1.handleErrors(accController.throwError));

router.post('/register', utilities.handleErrors(accController.registerAccount))
module.exports = router;
