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
  ({
    createLogger,
    createValidate,
    comparePassword,
    findOneCollection,
    signPayload,
    errors,
  }) =>
  async (input) => {
    const log = createLogger("user:login");
    log("Login a user");

    const validate = createValidate(config);

    const { email, password } = input;

    const validatedInput = validate({
      email,
      password,
    });

    //check if it does not exists
    const user = await findOneCollection({
      collection: "User",
      query: {
        email,
      },
    });
    if (!user) throw new errors.BadRequest("InvalidEmailOrPassword");

    // Compare passwords
    const isSame = await comparePassword({
      password: validatedInput.password,
      hashedPassword: user.password,
    });
    if (!isSame) throw new errors.BadRequest("InvalidEmailOrPassword");

    const token = await signPayload({ id: user._id });

    return { user: { ...user._doc, password: undefined }, token };
  };
