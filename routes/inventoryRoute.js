// Needed Resources 
const express = require("express")
const router = new express.Router() 
const invController = require("../controllers/invController")
const utilities = require("../utilities/")

// Route to build inventory by classification view
router.get("/type/:classificationId", invController.buildByClassificationId);

// Route to get vehicle details
router.get('/detail/:id', invController.getVehicleDetail);

// Management View Route
router.get("/", utilities.handleErrors(invController.buildManagementView));

// Broken route to test error handling
router.get("/broken", utilities.handleErrors(invController.throwError));

router.get("/add-classification", utilities.handleErrors(invController.buildAddClassificationView));

router.get("/", utilities.handleErrors(invController.addClassification));

router.get("/add-inventory", utilities.handleErrors(invController.buildAddInventoryView));

module.exports = router;