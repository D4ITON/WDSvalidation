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
      type: "string",
      minLength: MIN_ID_MONGODB_LENGTH, // id mongodb format
      maxLength: MAX_ID_MONGODB_LENGTH, // id mongodb format
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

// ------- USER VALIDATION ----------

function validateUser(user = {}) {
  if (user == null) return;
  const {
    username = "",
    firstName = "",
    lastName = "",
    role = "",
    password = "",
    repeatPassword = "",
    gender = 1, // to set a default value
    birthYear = null,
  } = user;

  const data = {
    username,
    firstName,
    lastName,
    role,
    password,
    repeatPassword,
    birthYear,
    gender,
    usernameInLowerCase: username.toLowerCase(),
  };

  const validations = {
    username: {
      required: true,
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
      type: "string",
    },
    firstName: {
      minLength: 0, // to replace no required
      maxLength: MAX_LENGTH,
      type: "string",
    },
    lastName: {
      minLength: 0, // to replace no required
      maxLength: MAX_LENGTH,
      type: "string",
    },
    role: {
      required: true,
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
      type: "string",
    },
    password: {
      required: true,
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
      type: "string",
    },
    repeatPassword: {
      required: true,
      minLength: MIN_LENGTH,
      maxLength: MAX_LENGTH,
      type: "string",
    },
    gender: {
      // nullable: false, // is not nullable, y can put nullable false
      maxValue: 1,
      minValue: 0,
      type: "number",
    },
    birthYear: {
      nullable: true,
      minValue: 1900,
      maxValue: 2020,
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

// Example to prove
const user = {
  username: "Pablo",
  firstName: "",
  lastName: "Piccaso",
  role: "admin",
  password: "secret",
  repeatPassword: "secret",
  gender: 1,
  birthYear: null,
};

const toprove = validateUser(user);
console.log(toprove);

/* output from this validation
{
  isValid: true,
  errors: {
    username: [],
    firstName: [],
    lastName: [],
    role: [],
    password: [],
    repeatPassword: [],
    gender: [],
    birthYear: []
  },
  data: {
    username: 'Pablo',
    firstName: '',
    lastName: 'Piccaso',
    role: 'admin',
    password: 'secret',
    repeatPassword: 'secret',
    birthYear: null,
    gender: 1,
    usernameInLowerCase: 'pablo'
  }
}
*/

// Example 2 to prove

const user2 = {
  username: "",
  firstName: "",
  lastName: "Piccaso is souper greater than oother very large...",
  role: "admin",
  password: "secret",
  repeatPassword: "ll",
  gender: 20,
  birthYear: 3990,
};

const toprove2 = validateUser(user2);
console.log(toprove2);

/* output
{
  isValid: false,
  errors: {
    username: [ 'is required', 'must be min 3 or more characters' ],
    firstName: [],
    lastName: [ 'must be at most 50 characters' ],
    role: [],
    password: [],
    repeatPassword: [ 'must be min 3 or more characters' ],
    gender: [ 'value must be at most 1' ],
    birthYear: [ 'value must be at most 2020' ]
  },
  data: {
    username: '',
    firstName: '',
    lastName: 'Piccaso is souper greater than oother very large...',
    role: 'admin',
    password: 'secret',
    repeatPassword: 'll',
    birthYear: 3990,
    gender: 20,
    usernameInLowerCase: ''
  }
}
*/
