const invModel = require("../models/inventory-model")
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

module.exports = invCont

///////////////////

/* async function getVehicleDetail(req, res) {
  const vehicleId = req.params.id;
  try {
      const vehicle = await inventoryModel.getVehicleById(vehicleId);
      if (!vehicle) {
          return res.status(404).send("Vehicle not found");
      }

      const vehicleHTML = utilities.formatVehicleHTML(vehicle);

      res.render('inventory/detail', {
          title: `${vehicle.make} ${vehicle.model}`,
          vehicleHTML
      });
  } catch (error) {
      console.error(error);
      res.status(500).send("Server Error");
  }
}

module.exports = { getVehicleDetail }; */