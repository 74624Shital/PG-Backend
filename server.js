const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const sequelize = require("./config/db");
const listingRoutes = require("./routes/listingRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// ✅ STATIC IMAGE FOLDER
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ ROUTES
app.use("/api/listings", listingRoutes);

// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

// ✅ START SERVER
const startServer = async () => {
  try {

    await sequelize.authenticate();
    console.log("Database Connected ✅");

    await sequelize.sync();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (err) {

    console.log("DB Error:", err);

  }
};

startServer();