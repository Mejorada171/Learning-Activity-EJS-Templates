document.getElementById("classificationForm").addEventListener("submit", function (e) {
    const name = document.getElementById("classification_name").value;
    const regex = /^[A-Za-z0-9]+$/;
  
    if (!regex.test(name)) {
      e.preventDefault();
      alert("Classification name must not contain spaces or special characters.");
    }
  });

  const { body, validationResult } = require("express-validator");

  module.exports = [
    body("classification_name")
      .trim()
      .notEmpty().withMessage("Classification name is required.")
      .isAlphanumeric().withMessage("Only letters and numbers allowed (no spaces or special characters)."),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        req.flash("errors", errors.array());
        return res.redirect("/inventory/add-classification");
      }
      next();
    }
  ];
  