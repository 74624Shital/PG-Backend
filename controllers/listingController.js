const Listing = require("../models/Listing");

// =====================================
// CREATE LISTING
// =====================================
exports.createListing = async (req, res) => {
  try {

    const {
      name,
      location,
      price,
      type,
      gender,
      category,
      description,
    } = req.body;

    // ✅ CLOUDINARY IMAGE URL
    const image = req.file
      ? req.file.path
      : null;

    // CREATE LISTING
    const listing = await Listing.create({
      name,
      location,
      price,
      type,
      gender,
      category,
      description,
      image,
    });

    res.status(201).json({
      success: true,
      message: "Listing Created Successfully",
      data: listing,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};

// =====================================
// GET ALL LISTINGS
// =====================================
exports.getListings = async (req, res) => {

  try {

    const listings = await Listing.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json(listings);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};

// =====================================
// GET SINGLE LISTING
// =====================================
exports.getSingleListing = async (req, res) => {

  try {

    const { id } = req.params;

    const listing = await Listing.findByPk(id);

    if (!listing) {

      return res.status(404).json({
        success: false,
        message: "Listing Not Found",
      });

    }

    res.status(200).json(listing);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};

// =====================================
// UPDATE LISTING
// =====================================
exports.updateListing = async (req, res) => {

  try {

    const { id } = req.params;

    const {
      name,
      location,
      price,
      type,
      gender,
      category,
      description,
    } = req.body;

    const listing = await Listing.findByPk(id);

    if (!listing) {

      return res.status(404).json({
        success: false,
        message: "Listing Not Found",
      });

    }

    // ✅ CLOUDINARY IMAGE URL
    const image = req.file
      ? req.file.path
      : listing.image;

    await listing.update({
      name,
      location,
      price,
      type,
      gender,
      category,
      description,
      image,
    });

    res.status(200).json({
      success: true,
      message: "Listing Updated Successfully",
      data: listing,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};

// =====================================
// DELETE LISTING
// =====================================
exports.deleteListing = async (req, res) => {

  try {

    const { id } = req.params;

    const listing = await Listing.findByPk(id);

    if (!listing) {

      return res.status(404).json({
        success: false,
        message: "Listing Not Found",
      });

    }

    await listing.destroy();

    res.status(200).json({
      success: true,
      message: "Listing Deleted Successfully",
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
};