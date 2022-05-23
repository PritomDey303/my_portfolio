const { check, validationResult } = require("express-validator");

const addExperienceValidators = [
  check("designation")
    .optional()
    .isLength({ min: 1 })
    .withMessage("designation is required")
    .isAlpha("en-US", { ignore: " -" })
    .withMessage("Designation must not contain anything other than alphabet")
    .trim(),
  check("company")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Company name is required")

    .trim(),
  check("description").optional().trim(),
  check("start_date").optional().isDate().withMessage("Valid date required."),
  check("end_date").optional().isDate().withMessage("Valid date required."),
  check("user_id")
    .isLength({ min: 1 })
    .withMessage("User id is required.")
    .trim(),
];

const addExperienceValidatorsHandler = function (req, res, next) {
  const errors = validationResult(req);
  const mappedErrors = errors.mapped();
  if (Object.keys(mappedErrors).length === 0) {
    next();
  } else {
    // response the errors
    res.json({
      status: 500,
      errors: mappedErrors,
    });
  }
};

module.exports = { addExperienceValidators, addExperienceValidatorsHandler };
