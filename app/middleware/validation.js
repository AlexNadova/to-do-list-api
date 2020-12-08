const Validator = require("validatorjs");

function validate(validationRule) {
  return async (req, res, next) => {
    try {
      const validation = new Validator(req.body, validationRule, {});
      if (validation.fails()) {
        throw validation.errors;
      } else {
        next();
      }
    } catch (error) {
      res.status(412).send({
        success: false,
        message: "Validation failed",
        data: error,
      });
      return;
    }
  };
}

module.exports = validate;
