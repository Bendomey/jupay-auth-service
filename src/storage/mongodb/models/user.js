export const user = {
  lastName: { type: String, required: true, trim: true },
  otherNames: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true },
  country: { type: String, trim: true, default: "US" },
  state: { type: String, trim: true },
  addressLine: { type: String, trim: true },
  type: {
    type: String,
    trim: true.valueOf,
    enum: ["INDIVIDUAL", "BUSINESS"],
    default: "INDIVIDUAL",
  },
  setup: { type: Date },
  senderId: { type: String },
};
