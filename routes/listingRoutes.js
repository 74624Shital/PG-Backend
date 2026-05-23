const express = require("express");
const router = express.Router();
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Controllers
const {
  createListing,
  getListings,
  getSingleListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

// ======================
// CLOUDINARY CONFIG
// ======================
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// ======================
// MULTER + CLOUDINARY
// ======================
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pg-listings",
    allowed_formats: ["jpg", "png", "jpeg", "webp"],
  },
});

const upload = multer({ storage });

// ======================
// ROUTES
// ======================

// CREATE LISTING
router.post("/", upload.single("image"), createListing);

// GET ALL LISTINGS
router.get("/", getListings);

// GET SINGLE LISTING
router.get("/:id", getSingleListing);

// UPDATE LISTING
router.put("/:id", upload.single("image"), updateListing);

// DELETE LISTING
router.delete("/:id", deleteListing);

module.exports = router;