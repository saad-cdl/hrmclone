import logo from "../models/logo.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import uploadoncloudinary from "../utils/cloudinary.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";

const getLogos = asynchandler(async (req, res, next) => {
  try {
    const logos = await logo.findAll();
    if (logos) {
      res.status(200).json(new ApiResponse(200, logos, "Logos"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getLogoById = asynchandler(async (req, res, next) => {
  try {
    const logoid = req.params.id;
    const logos = await logo.findOne({ id: logoid });
    if (logos) {
      res.status(200).json(new ApiResponse(200, logos, "Logo"));
    } else {
      throw new ApiError(404, "Logo not found");
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const addLogo = asynchandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new ApiError(400, "Please fill all the fields: name, image");
    }
    console.log(req.file?.path);
    const localpath = req.file?.path;
    if (!localpath) {
      throw new ApiError(400, "Please upload the image");
    }
    const image_path = await uploadoncloudinary(localpath);
    if (!image_path) {
      throw new ApiError(500, "Error in uploading image");
    }

    const newlogo = await logo.create({
      name: name,
      url: image_path.url,
    });
    if (newlogo) {
      res.status(201).json(new ApiResponse(200, newlogo, "Logo Created"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateLogo = asynchandler(async (req, res, next) => {
  try {
    const logoid = req.params.id;
    const Logoexsist = await logo.findOne({ where: { id: logoid } });
    if (!Logoexsist) {
      throw new ApiError(404, "Logo not found");
    }

    const { name } = req.body;
    if (!name) {
      throw new ApiError(400, "Please fill all the fields: name, image");
    }
    const localpath = req.file?.path;

    if (!localpath) {
      throw new ApiError(400, "Please upload the image");
    }
    const image_path = await uploadoncloudinary(localpath);
    if (!image_path) {
      throw new ApiError(500, "Error in uploading image");
    }

    const updatelogo = await logo.update(
      { name: name, url: image_path.url },
      { where: { id: logoid } }
    );
    if (updatelogo) {
      res.status(200).json(new ApiResponse(200, updatelogo, "Logo Updated"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteLogo = asynchandler(async (req, res, next) => {
  try {
    const logoid = req.params.id;
    const deletelogo = await logo.destroy({ where: { id: logoid } });
    if (deletelogo) {
      res.status(200).json(new ApiResponse(200, deletelogo, "Logo Deleted"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export { getLogos, getLogoById, addLogo, updateLogo, deleteLogo };
