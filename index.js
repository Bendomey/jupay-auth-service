// Registering ESM so we can use imports instead of require - https://github.com/standard-things/esm

const curriedRequire = require("esm")(module /*, options */);
module.exports = curriedRequire("./src");
