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

    // IMAGE
    const image = req.file
      ? req.file.filename
      : null;

    // CREATE NEW LISTING
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

    // RESPONSE WITH FULL IMAGE URL
    const updatedListing = {

      ...listing.toJSON(),

      image: image
        ? `https://pg-backend-9xs4.onrender.com/uploads/${image}`
        : null,

    };

    res.status(201).json({

      success: true,
      message: "Listing Created Successfully",
      data: updatedListing,

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

    // ADD FULL IMAGE URL
    const updatedListings = listings.map((listing) => ({

      ...listing.toJSON(),

      image: listing.image
        ? `https://pg-backend-9xs4.onrender.com/uploads/${listing.image}`
        : null,

    }));

    res.status(200).json(updatedListings);

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

    // NOT FOUND
    if (!listing) {

      return res.status(404).json({

        success: false,
        message: "Listing Not Found",

      });

    }

    // FULL IMAGE URL
    const updatedListing = {

      ...listing.toJSON(),

      image: listing.image
        ? `https://pg-backend-9xs4.onrender.com/uploads/${listing.image}`
        : null,

    };

    res.status(200).json(updatedListing);

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

    // FIND LISTING
    const listing = await Listing.findByPk(id);

    // NOT FOUND
    if (!listing) {

      return res.status(404).json({

        success: false,
        message: "Listing Not Found",

      });

    }

    // IMAGE
    const image = req.file
      ? req.file.filename
      : listing.image;

    // UPDATE LISTING
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

    // UPDATED RESPONSE
    const updatedListing = {

      ...listing.toJSON(),

      image: image
        ? `https://pg-backend-9xs4.onrender.com/uploads/${image}`
        : null,

    };

    res.status(200).json({

      success: true,
      message: "Listing Updated Successfully",
      data: updatedListing,

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

    // NOT FOUND
    if (!listing) {

      return res.status(404).json({

        success: false,
        message: "Listing Not Found",

      });

    }

    // DELETE
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