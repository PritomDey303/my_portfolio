const { check, validationResult } = require("express-validator");
const res = require("express/lib/response");
const Authentication = require("../../models/authentication");
const ObjectId = require("mongodb").ObjectID;
const createError = require("http-errors");

const addProjectValidators = [
  check("title")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Title is required")
    .trim(),

  check("description")
    .optional()
    .isLength({ min: 1 })
    .withMessage("Description is required")
    .trim(),
  ,
  check("technologies").optional().isArray().withMessage("Invalid input."),
  check("frontend_code_link").optional().isURL().withMessage("Invalid URL"),
  check("backend_code_link").optional().isURL().withMessage("Invalid URL"),
  check("live_site_link").optional().isURL().withMessage("Invalid URL"),
  check("project_img").optional().isArray().withMessage("Invalid input."),

  check("user_id")
    .isLength({ min: 1 })
    .withMessage("User id is required.")
    .trim()
    .custom(async (value) => {
      try {
        const data = await Authentication.findById(ObjectId(value));
        if (!data.length) {
          throw createError("Invalid request!");
        }
      } catch (err) {
        res.json({
          status: 500,
          message: "Sorry! Something went wrong.",
        });
      }
    }),
];

const addProjectValidatorsHandler = function (req, res, next) {
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

module.exports = { addProjectValidators, addProjectValidatorsHandler };