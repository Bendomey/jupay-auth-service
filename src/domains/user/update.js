export const config = {
  type: "object",
  properties: {
    id: { type: "string" },
    state: { type: "string" },
    addressLine: { type: "string" },
    senderId: { type: "string" },
  },
  required: ["id", "state", "addressLine", "senderId"],
  additionalProperties: false,
};

export const update =
  ({
    createLogger,
    createValidate,
    newCollection,
    hashPassword,
    findByIdCollection,
    errors,
    signPayload,
  }) =>
  async (input) => {
    const log = createLogger("user:update");
    log("Updating an existing user");

    const validate = createValidate(config);

    const { id, state, addressLine, senderId } = input;

    const validatedInput = validate({
      id,
      state,
      addressLine,
      senderId,
    });

    // check if it exists
    const user = await findByIdCollection({
      collection: "User",
      query: validatedInput.id,
    });
    if (!user) throw new errors.BadRequest("UserNotFound");

    user.state = validatedInput.state;
    user.addressLine = validatedInput.addressLine;
    user.senderId = validatedInput.senderId;
    user.setup = new Date();

    await user.save();

    const token = await signPayload({ id: user._id });

    return { user: { ...user._doc, password: undefined }, token };
  };
