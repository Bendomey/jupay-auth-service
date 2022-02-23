export const config = {
  type: "object",
  properties: {
    lastName: { type: "string" },
    otherNames: { type: "string" },
    email: { type: "string" },
    phone: { type: "string" },
    password: { type: "string" },
  },
  required: ["lastName", "otherNames", "email", "phone", "password"],
  additionalProperties: false,
};

export const create =
  ({ createLogger, createValidate, newCollection }) =>
  async (input) => {
    const log = createLogger("user:create");
    log("Creating a new user");

    const validate = createValidate(config);

    const { lastName, otherNames, email, phone, password } = input;

    const validatedInput = validate({
      lastName,
      otherNames,
      email,
      phone,
      password,
    });

    // Save to DB
    const res = await newCollection({
      collection: "User",
      query: {
        ...validatedInput,
      },
    }).save();

    return res;
  };
