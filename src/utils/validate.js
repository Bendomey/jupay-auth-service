import Ajv from "ajv";

// validates schemas
const ajv = new Ajv();

export const createValidate =
  ({ errors }) =>
  (schema) =>
  (data) => {
    const validate = ajv.compile(schema);
    const isValid = validate(data);
    if (!isValid) throw new errors.BadRequest(validate.errors);
    return data;
  };
