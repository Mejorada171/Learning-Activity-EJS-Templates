// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to get vehicle details
router.get('/detail/:id', invController.getVehicleDetail);

// Broken route
router.get("/broken", utilities.handleErrors(invController.throwError));

module.exports = router;