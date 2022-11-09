const mongoose = require("mongoose");
const app = require("../src/app");

const port = 3000;
const url = "mongodb+srv://alcbcoelho:SO1hPsxC3btSCyGE@cluster0.wnaljx6.mongodb.net/playlistenin?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(
    app.listen(port, () =>
      console.log(`Running local server at port ${port} ~`)
    )
  )
  .catch(error => console.error(`ERROR: ${error}`));