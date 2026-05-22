// const { DataTypes } = require("sequelize");
// const sequelize = require("../config/db");

// const Listing = sequelize.define(
//   "Listing",
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },

//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },

//     location: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     price: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },

//     type: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     gender: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     category: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },

//     description: {
//       type: DataTypes.TEXT,
//       allowNull: true,
//     },

//     image: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//   },
//   {
//     tableName: "listings",
//     timestamps: true,
//   }
// );

// module.exports = Listing;/

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Listing = sequelize.define(
  "Listing",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    location: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    type: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    gender: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "listings",
    timestamps: true,
  }
);

module.exports = Listing;