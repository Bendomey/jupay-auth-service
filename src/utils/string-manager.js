import _ from "lodash";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789", 6);
export const createGenerateVerificationCode = () => async () => nanoid();

export const createGenerateRandomString = () => async (length) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
