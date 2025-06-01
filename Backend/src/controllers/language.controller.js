import language from "../models/language.model.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
import asyncHandler from "../utils/AsyncHandler.js";

const getLanguages = asyncHandler(async (req, res, next) => {
  try {
    const languages = await language.findAll();
    if (languages) {
      res.status(200).json(new ApiResponse(200, languages, "Languages"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const getLanguageById = asyncHandler(async (req, res, next) => {
  try {
    const languageid = req.params.id;
    const languages = await language.findByPk(languageid);
    if (languages) {
      res.status(200).json(new ApiResponse(200, languages, "Language"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const addLanguage = asyncHandler(async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      throw new ApiError(400, "Please fill all the fields: name");
    }
    if (name.length < 3) {
      throw new ApiError(400, "Name should be atleast 3 characters");
    }
    const languageexsist = await language.findOne({ where: { name } });
    if (languageexsist) {
      res
        .status(201)
        .json(new ApiResponse(200, languageexsist, "Language Created"));
    }
    const newlanguage = await language.create({
      name: name,
    });
    if (newlanguage) {
      res
        .status(201)
        .json(new ApiResponse(200, newlanguage, "Language Created"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const updateLanguage = asyncHandler(async (req, res, next) => {
  try {
    const languageid = req.params.id;
    const { name } = req.body;
    if (!name) {
      throw new ApiError(400, "Please fill all the fields: name");
    }
    const updatelanguage = await language.update(
      { name: name },
      { where: { id: languageid } }
    );
    if (updatelanguage) {
      res
        .status(200)
        .json(new ApiResponse(200, updatelanguage, "Language Updated"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const deleteLanguage = asyncHandler(async (req, res, next) => {
  try {
    const languageid = req.params.id;
    const languages = await language.findByPk(languageid);
    if (!languages) {
      throw new ApiError(400, "Language does not exists");
    }
    const deletelanguage = await language.destroy({
      where: { id: languageid },
    });
    if (deletelanguage) {
      res.status(200).json(new ApiResponse(200, {}, "Language Deleted"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  getLanguages,
  getLanguageById,
  addLanguage,
  updateLanguage,
  deleteLanguage,
};
