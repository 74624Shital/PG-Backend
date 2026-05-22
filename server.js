const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

// DATABASE
const sequelize = require("./config/db");

// ROUTES
const listingRoutes = require("./routes/listingRoutes");

const app = express();


// ===================================
// MIDDLEWARE
// ===================================
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ===================================
// STATIC FOLDER FOR IMAGES
// ===================================
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);


// ===================================
// API ROUTES
// ===================================
app.use("/api/listings", listingRoutes);


// ===================================
// TEST ROUTE
// ===================================
app.get("/", (req, res) => {

  res.send("Backend Running Successfully 🚀");

});


// ===================================
// DATABASE CONNECTION + SERVER
// ===================================
sequelize
  .sync()
  .then(() => {

    console.log("✅ MySQL Connected Successfully");

    app.listen(process.env.PORT || 5000, () => {

      console.log(
        `✅ Server Running On Port ${
          process.env.PORT || 5000
        }`
      );

    });

  })
  .catch((error) => {

    console.log("❌ Database Connection Error");

    console.log(error);

  });