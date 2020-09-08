# WebDevSimplified validations

A library of simple validators, numbers and strings,
this is an enhancement of code from Kyle Cook based on validations from this video https://youtu.be/5B587bQ-TNg

- github repository: https://github.com/WebDevSimplified/Noob-Vs-Pro-Code

Example:

```js
const validation = require("./index");

const MIN_VALUE = 0; // number
const MAX_VALUE = 99999; // number
const MIN_LENGTH = 3; // string
const MAX_LENGTH = 50; // string
const MIN_ID_MONGODB_LENGTH = 23;
const MAX_ID_MONGODB_LENGTH = 26;

/**
 * Product rules
 * @param {Object} product
 */
function validateProduct(product = {}) {
  if (product == null) return;
  const { name = "", active = true, price = 0, categoryId = "" } = product;

  const data = {
    name,
    categoryId,
    price,
    active,
  };

  const validations = {
    name: {
      required: true,
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
      type: "string",
    },
    categoryId: {
      required: true,
      minLength: MIN_ID_MONGODB_LENGTH, // id mongodb format
      maxLength: MAX_ID_MONGODB_LENGTH, // id mongodb format
      type: "string",
    },
    price: {
      maxValue: MAX_VALUE,
      minValue: MIN_VALUE,
      type: "number",
    },
  };

  const errors = validation(validations, data);

  return {
    isValid: Object.values(errors).every((messages) => messages.length === 0),
    errors,
    data,
  };
}

// data to validate:
const product = {
  name: "ceviche",
  categoryId: "123",
  price: 10,
};

const miOut = validateProduct(product);
console.log(miOut);

/* output from product validation

  isValid: false,
  errors: {
    name: [],
    categoryId: ["must be min 23 or more characters"],
    price: [],
  },
  data: {
    name: "ceviche",
    categoryId: "123",
    price: 10,
    active: true,
  },
*/
```
