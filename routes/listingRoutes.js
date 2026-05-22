const express = require("express");
const router = express.Router();
const multer = require("multer");

// Controllers
const {
  createListing,
  getListings,
  getSingleListing,
  updateListing,
  deleteListing,
} = require("../controllers/listingController");

// ======================
// MULTER CONFIG
// ======================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// ======================
// ROUTES
// ======================

// CREATE LISTING (with image upload)
router.post("/", upload.single("image"), createListing);

// GET ALL LISTINGS
router.get("/", getListings);

// 🔥 GET SINGLE LISTING (THIS WAS MISSING BEFORE)
router.get("/:id", getSingleListing);

// UPDATE LISTING (with image upload)
router.put("/:id", upload.single("image"), updateListing);

// DELETE LISTING
router.delete("/:id", deleteListing);

module.exports = router;