# WebDevSimplified validations

A library of simple validators, numbers and strings, this is an enhancement of code from Kyle Cook based on validations.

- [Youtube video](https://youtu.be/5B587bQ-TNg "youtube video explaining how it works") from WebDevSimplified

- [github repository](https://github.com/WebDevSimplified/Noob-Vs-Pro-Code/blob/master/4-fat-functions/3-pro.js "WebDevSimplified example")

- [here](examples.js "examples using wdsvalidation") are more examples

## Usage

install using a package manager

`yarn add wdsvalidation`

then required and use it.

```js
const validation = require("wdsvalidation");

// rules
const validations = {
  name: {
    required: true,
    minLength: 3,
    maxLength: 50,
    type: "string",
  },
  categoryId: {
    required: true,
    minLength: 23, // id mongodb format
    maxLength: 25, // id mongodb format
    type: "string",
  },
  price: {
    minValue: 0,
    maxValue: 999,
    type: "number",
  },
};

// data to validate:
const product = {
  name: "ceviche",
  categoryId: "123",
  price: 10,
};

const errors = validation(validations, product);

//output from product validation
errors: {
  name: [],
  categoryId: ["must be min 23 or more characters"],
  price: [],
}

```

## license MIT
