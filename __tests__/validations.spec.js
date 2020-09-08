/**
 * Validation tests
 * creado el 30 Ago 2020 - Dalthon
 */

const validation = require("../index.js");

describe("Validate function", () => {
  test("WDSValidation success", () => {
    const validations = {
      name: {
        required: true,
        minLength: 3,
        maxLength: 10,
        type: "string",
      },
      categoryId: {
        required: true,
      },
      price: {
        required: true,
        maxValue: 98,
        minValue: 0,
      },
    };

    const product = {
      name: "frejoles",
      categoryId: "123456",
      price: 0,
    };

    const output = {
      name: [],
      categoryId: [],
      price: [],
    };

    expect(validation(validations, product)).toEqual(output);
  });

  test("Test error required validation", () => {
    const validations = {
      name: { required: true },
    };

    const product = { name: "" };

    const output = {
      name: ["is required"],
    };

    expect(validation(validations, product)).toEqual(output);
  });

  test("Test error Min length", () => {
    const validations = {
      name: { minLength: 10 },
    };

    const product = { name: "cuatro" };

    const output = {
      name: ["must be min 10 or more characters"],
    };

    expect(validation(validations, product)).toEqual(output);
  });

  test("Test error Max length", () => {
    const validations = {
      name: { maxLength: 8, type: "string" },
    };

    const product = { name: "muylargooo" };

    const output = {
      name: ["must be at most 8 characters"],
    };

    expect(validation(validations, product)).toEqual(output);
  });

  test("Test error Min Value", () => {
    const validations = {
      price: {
        maxValue: 98,
        minValue: 0,
      },
    };

    const product = { price: -10 };

    const output = {
      price: ["value must be at least 0"],
    };

    expect(validation(validations, product)).toEqual(output);
  });

  test("Test error type string", () => {
    const validations = {
      categoryId: {
        type: "string",
      },
    };

    const product = { categoryId: 100 };

    const output = {
      categoryId: ["type must be a string"],
    };

    expect(validation(validations, product)).toEqual(output);
  });

  test("Test error type number", () => {
    const validations = {
      categoryId: { type: "number" },
    };

    const product = { categoryId: "mistring" };

    const output = {
      categoryId: ["type must be a number"],
    };

    expect(validation(validations, product)).toEqual(output);
  });
});
