const express = require("express");
const app = require("express")();
const cors = require("cors");
const PORT = 8000 || process.env.PORT;
require("dotenv").config();
const corsOptions = {
  origin: function (origin, callback) {
    if (origin.includes("localhost") || origin.includes("127.0.0.1")) {
      callback(null, true);
    } else {
      var msg =
        "The CORS policy for this site does not " +
        "allow access from the specified Origin.";
      callback(new Error(msg), false);
    }
  },
  optionsSuccessStatus: 200,
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/spotify", require("./routes/spotifyRoute"));
app.listen(PORT, () => {
  console.log("Runnig on port 8000");
});
