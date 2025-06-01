import address from "../models/address.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";

const createAddress = asynchandler(async (req, res, next) => {
  try {
    const { country, area, city, zip_code, address_line } = req.body;
    if (!country || !city) {
      throw new ApiError(400, "Country and City and address line are required");
    }
    const newAddress = await address.create({
      country,
      area,
      city,
      zip_code,
      address_line,
    });
    if (!newAddress) {
      res.status(500).json(new ApiError(500, null, "Error Creating Address"));
    }
    res.status(201).json(new ApiResponse(200, newAddress, "Address Created"));
  } catch (error) {}
});

const getAddress = asynchandler(async (req, res, next) => {
  try {
    const addressList = await address.findAll();
    if (addressList) {
      res.status(200).json(new ApiResponse(200, addressList, "Address List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getAddressByID = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const addressList = await address.findOne({ where: { id } });
    if (addressList) {
      res.status(200).json(new ApiResponse(200, addressList, "Address List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateAddress = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { country, area, city, zip_code, address_line } = req.body;
    if (!country || !city) {
      throw new ApiError(400, "Country and City and address line are required");
    }
    const updateAddress = await address.update(
      {
        country,
        area,
        city,
        zip_code,
        address_line,
      },
      { where: { id } }
    );
    if (!updateAddress) {
      res.status(500).json(new ApiError(500, null, "Error Updating Address"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, updateAddress, "Address Updated"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteAddress = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteAddress = await address.destroy({ where: { id } });
    if (!deleteAddress) {
      res.status(500).json(new ApiError(500, null, "Error Deleting Address"));
    }
    res
      .status(200)
      .json(new ApiResponse(200, deleteAddress, "Address Deleted"));
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  createAddress,
  getAddress,
  getAddressByID,
  updateAddress,
  deleteAddress,
};
