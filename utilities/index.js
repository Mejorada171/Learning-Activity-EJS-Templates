const invModel = require("../models/inventory-model");
const Util = require("../utilities/");

/* ************************
 * Constructs the nav HTML unordered list
 ************************** */
Util.getNav = async function (req, res, next) {
  let data = await invModel.getClassifications();
  let list = '<ul class="nav-list">'; // Added class for styling

  list += '<li class="nav-item"><a href="/" class="nav-link" title="Home page">Home</a></li>';
  
  data.rows.forEach((row) => {
    list += '<li class="nav-item">';
    list +=
      '<a href="/inv/type/' +
      row.classification_id +
      '" class="nav-link" title="See our inventory of ' +
      row.classification_name +
      ' vehicles">' +
      row.classification_name +
      "</a>";
    list += "</li>";
  });

  list += "</ul>";
  return list;
};

/* **************************************
 * Build the classification view HTML
 * ************************************ */
Util.buildClassificationGrid = async function (data) {
  let grid;
  if (data.length > 0) {
    grid = '<ul id="inv-display" class="inventory-list">';

    data.forEach((vehicle) => {
      grid += '<li class="inventory1">';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" class="inventory-link" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details"><img src="' +
        vehicle.inv_thumbnail +
        '" class="inventory-image" alt="Image of ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' on CSE Motors" /></a>';
      grid += '<div class="namePrice">';
      grid += "<hr />";
      grid += '<h2 class="vehicle-title">';
      grid +=
        '<a href="../../inv/detail/' +
        vehicle.inv_id +
        '" class="vehicle-link" title="View ' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        ' details">' +
        vehicle.inv_make +
        " " +
        vehicle.inv_model +
        "</a>";
      grid += "</h2>";
      grid +=
        '<span class="vehicle-price">$' +
        new Intl.NumberFormat("en-US").format(vehicle.inv_price) +
        "</span>";
      grid += "</div>";
      grid += "</li>";
    });

    grid += "</ul>";
  } else {
    grid = '<p class="notice">Sorry, no matching vehicles could be found.</p>';
  }
  return grid;
};

Util.buildVehicleDetail = async function (vehicle) {
  return `
      <div class="vehicle-container">
          <img src="${vehicle.inv_image}" alt="${vehicle.inv_make} ${vehicle.inv_model}" class="vehicle-image">
          <div class="vehicle-details">
              <h2>${vehicle.inv_year} ${vehicle.inv_make} ${vehicle.inv_model}</h2>
              <p><strong>Price:</strong> $${vehicle.inv_price.toLocaleString()}</p>
              <p><strong>Mileage:</strong> ${vehicle.inv_miles.toLocaleString()} miles</p>
              <p><strong>Description:</strong> ${vehicle.inv_description}</p>
          </div>
      </div>
  `;
}

/* ****************************************
 * Middleware For Handling Errors
 * Wrap other function in this for 
 * General Error Handling
 **************************************** */
// Example: utilities/index.js

// Add the error handler
Util.handleErrors = fn => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next)

module.exports = Util

