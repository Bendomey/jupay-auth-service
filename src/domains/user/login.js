export const config = {
  type: "object",
  properties: {
    email: { type: "string" },
    password: { type: "string" },
  },
  required: ["email", "password"],
  additionalProperties: false,
};

export const login =
  ({ createLogger, createValidate, newCollection }) =>
  async (input) => {
    const log = createLogger("user:login");
    log("Login a user");

    const validate = createValidate(config);

    const { email, password } = input;

    const validatedInput = validate({
      email,
      password,
    });

    // Check DB
    const res = await newCollection({
      collection: "User",
      query: {
        ...validatedInput,
      },
    }).save();

    return res;
  };
