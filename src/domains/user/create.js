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
  ({
    createLogger,
    createValidate,
    newCollection,
    hashPassword,
    findOneCollection,
    errors,
    signPayload,
  }) =>
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

    // check if it exists
    const user = await findOneCollection({
      collection: "User",
      query: {
        email,
      },
    });
    if (user) throw new errors.BadRequest("UserAlreadyExist");

    // Save to DB
    const res = await newCollection({
      collection: "User",
      query: {
        ...validatedInput,
        password: await hashPassword(password),
      },
    }).save();

    const token = await signPayload({ id: res._id });

    return { user: { ...res._doc, password: undefined }, token };
  };
