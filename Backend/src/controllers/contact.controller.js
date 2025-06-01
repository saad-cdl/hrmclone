import contact from "../models/contact.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";

const CreateContact = asynchandler(async (req, res, next) => {
  try {
    const { secondary_email, phone, mobile, email } = req.body;

    if (!email || !mobile || !phone) {
      throw new ApiError(
        400,
        "Please fill all the fields: Required Fields are email, mobile and phone"
      );
    }

    const newcontact = await contact.create({
      secondary_email: secondary_email,
      phone: phone,
      email: email,
    });

    if (newcontact) {
      res.status(201).json(new ApiResponse(200, newcontact, "Conatct Created"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const GetContact = asynchandler(async (req, res, next) => {
  try {
    const contactlist = await contact.findAll();
    if (contactlist) {
      res.status(200).json(new ApiResponse(200, contactlist, "Contact List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const GetContactByID = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactlist = await contact.findOne({ where: { id } });
    if (contactlist) {
      res.status(200).json(new ApiResponse(200, contactlist, "Contact List"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const UpdateContact = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { secondary_email, phone, mobile, email } = req.body;

    if (!email || !mobile || !phone) {
      throw new ApiError(
        400,
        "Please fill all the fields: Required Fields are email, mobile and phone"
      );
    }

    const updatecontact = await contact.update(
      {
        secondary_email: secondary_email,
        phone: phone,
        email: email,
      },
      { where: { id } }
    );

    if (updatecontact) {
      res
        .status(200)
        .json(new ApiResponse(200, updatecontact, "Contact Updated"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

const DeleteContact = asynchandler(async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletecontact = await contact.destroy({ where: { id } });
    if (deletecontact) {
      res.status(200).json(new ApiResponse(200, {}, "Contact Deleted"));
    }
  } catch (error) {
    throw new ApiError(500, error.message);
  }
});

export {
  CreateContact,
  GetContact,
  GetContactByID,
  UpdateContact,
  DeleteContact,
};
