const mongoose = require("mongoose");
const app = require("../src/app");
const config = require("../src/config/env.json");

mongoose
  .connect(config.url)
  .then(
    app.listen(config.port, () =>
      console.log(`Running local server at port ${config.port} ~`)
    )
  )
  .catch(err => console.error(`ERROR: ${err}`));