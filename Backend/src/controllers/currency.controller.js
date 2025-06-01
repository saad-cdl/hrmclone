import currency from "../models/currency.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";

const CreateCurrency = asynchandler(async (req, res, next) => {
  try {
    const { name, symbol } = req.body;
    if (!name || !symbol) {
      throw new ApiError(
        400,
        "Please fill all the fields: Required Fields are name and symbol"
      );
    }
    const currencylist = await currency.create({
      name: name,
      symbol: symbol,
    });
    if (currencylist) {
      res
        .status(201)
        .json(new ApiResponse(201, currencylist, "Currency Created"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const GetCurrency = asynchandler(async (req, res, next) => {
  try {
    const currencylist = await currency.findAll();
    if (currencylist) {
      res.status(200).json(new ApiResponse(200, currencylist, "Currency List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const GetCurrencyByID = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const currencylist = await currency.findOne({ where: { id } });
    if (currencylist) {
      res.status(200).json(new ApiResponse(200, currencylist, "Currency List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const UpdateCurrency = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, symbol } = req.body;
    if (!name || !symbol) {
      throw new ApiError(
        400,
        "Please fill all the fields: Required Fields are name and symbol"
      );
    }
    const currencylist = await currency.update(
      { name: name, symbol: symbol },
      { where: { id } }
    );
    if (currencylist) {
      res
        .status(200)
        .json(new ApiResponse(200, currencylist, "Currency Updated"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const DeleteCurrency = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const currencylist = await currency.destroy({ where: { id } });
    if (currencylist) {
      res
        .status(200)
        .json(new ApiResponse(200, currencylist, "Currency Deleted"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  CreateCurrency,
  GetCurrency,
  GetCurrencyByID,
  UpdateCurrency,
  DeleteCurrency,
};
