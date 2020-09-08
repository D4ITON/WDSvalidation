/**
 * WebDevSimplified validations (WDSvalidation)
 * =============================
 * This is an enhancement of code from Kyle Cook based on
 * this video https://youtu.be/5B587bQ-TNg
 * github repository: https://github.com/WebDevSimplified/Noob-Vs-Pro-Code
 * Adapted at: 30 Ago 2020
 * Pusblished: 08 Sep 2020
 */

/**
 * Core validation
 * @param {Object} validations
 * @param {Object} object
 * @returns {Object} object of erros
 * Availables validations:
 * - required {Boolean} - if it is not required don't put it
 * - minLength {Number} - validate when type is an string
 * - maxLength {Number} -
 * - minValue {Number} -
 * - maxValue {Number}
 * - type {String}
 */
function validation(validations, object) {
  return Object.entries(validations).reduce((errors, [property, rule]) => {
    errors[property] = [];
    if (rule.required) {
      error = validateRequired(object[property], rule.required);
      if (error) errors[property].push(error);
    }

    if (rule.minLength || typeof rule.minLength === "number") {
      error = validateMinLength(
        object[property],
        rule.minLength,
        rule.required
      );
      if (error) errors[property].push(error);
    }

    if (rule.maxLength || typeof rule.maxLength === "number") {
      error = validateMaxLength(
        object[property],
        rule.maxLength,
        rule.required
      );
      if (error) errors[property].push(error);
    }

    if (rule.maxValue || typeof rule.maxValue === "number") {
      error = validateMaxValue(object[property], rule.maxValue);
      if (error) errors[property].push(error);
    }

    if (rule.minValue || typeof rule.minValue === "number") {
      error = validateMinValue(object[property], rule.minValue);
      if (error) errors[property].push(error);
    }

    if (rule.type) {
      error = validateType(object[property], rule.type, rule.nullable);
      if (error) errors[property].push(error);
    }

    return errors;
  }, {});
}

/**
 * Review if is required
 * @param {String} property
 * @param {String} value
 * @param {Boolean} ruleValue
 */
function validateRequired(value, isRequired) {
  if (!isRequired || value || typeof value === "number") return;
  return `is required`;
}

/**
 * Validate min of string length
 * @param {String} property
 * @param {String} value
 * @param {Number} length
 */
function validateMinLength(value, length, required = true) {
  if (value == null || typeof value !== "string") return;
  if (!value.length && !required) return;
  if (value.trim().length >= length) return;

  return `must be min ${length} or more characters`;
}

/**
 * Validate max of string length
 * @param {String} property
 * @param {String} value
 * @param {Number} length
 */
function validateMaxLength(value, length, required = true) {
  if (value == null || typeof value !== "string") return;
  if (!value && !required) return;
  if (value.trim().length <= length) return;

  return `must be at most ${length} characters`;
}

/**
 * Validate max value (number)
 * @param {Number} value
 * @param {Number} maxValue
 */
function validateMaxValue(value, maxValue) {
  if (value == null) return;
  if (value <= maxValue) return;

  return `value must be at most ${maxValue}`;
}

/**
 * Validate min value (number)
 * @param {Number} value
 * @param {Number} maxValue
 */
function validateMinValue(value, minValue) {
  if (value == null) return;
  if (value >= minValue) return;
  console.log(value >= minValue);

  return `value must be at least ${minValue}`;
}

/**
 * Type of function
 * @param {String} value
 * @param {String} type
 * @param {Boolean} nullable
 */
function validateType(value, type, nullable = false) {
  if (typeof value === type || (nullable && value == null)) return;
  return `type must be a ${type}`;
}

module.exports = validation;
