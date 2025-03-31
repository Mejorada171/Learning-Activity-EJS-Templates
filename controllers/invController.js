const invModel = require("../models/inventory-model")
const { get } = require("../routes/static")
const utilities = require("../utilities/")

const invCont = {}

/* ***************************
 *  Build inventory by classification view
 * ************************** */
invCont.buildByClassificationId = async function (req, res, next) {
  const classification_id = req.params.classificationId
  const data = await invModel.getInventoryByClassificationId(classification_id)
  const grid = await utilities.buildClassificationGrid(data)
  let nav = await utilities.getNav()
  const className = data[0].classification_name
  res.render("./inventory/classification", {
    title: className + " vehicles",
    nav,
    grid,
  })
}

///////////////////

invCont.getVehicleDetail = async function (req, res) {
  const vehicleId = req.params.id;
  try {
      const vehicle = await invModel.getVehicleById(vehicleId);
      if (!vehicle) {
          return res.status(404).send("Vehicle not found");
      }

      const vehicleHTML = await utilities.buildVehicleDetail(vehicle);
      let nav = await utilities.getNav()
      res.render('inventory/detail', {
          title: `${vehicle.inv_make} ${vehicle.inv_model}`,
          nav, 
          vehicleHTML
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
}

/* ***************************
 * Handles footer error link
 * ************************** */
invCont.throwError = async function (req, res) {
  throw new Error("I am an intentional error");
};

module.exports = invCont