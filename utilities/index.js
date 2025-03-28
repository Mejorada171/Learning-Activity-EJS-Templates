const invModel = require("../models/inventory-model");
const Util = {};

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

module.exports = Util;

///////

/* function formatVehicleHTML(vehicle) {
  return `
      <div class="vehicle-container">
          <img src="${vehicle.image_url}" alt="${vehicle.make} ${vehicle.model}" class="vehicle-image">
          <div class="vehicle-details">
              <h2>${vehicle.year} ${vehicle.make} ${vehicle.model}</h2>
              <p><strong>Price:</strong> $${vehicle.price.toLocaleString()}</p>
              <p><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} miles</p>
              <p><strong>Description:</strong> ${vehicle.description}</p>
          </div>
      </div>
  `;
}

module.exports = { formatVehicleHTML }; */
