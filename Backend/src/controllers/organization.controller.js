import organization from "../models/organization.model.js";
import logo from "../models/logo.model.js";
import contact from "../models/contact.model.js";
import address from "../models/address.model.js";
import currency from "../models/currency.model.js";
import language from "../models/language.model.js";
import asynchandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ErrorHandling.js";
import ApiResponse from "../utils/ResponseHandling.js";
import employee from "../models/employee.model.js";

const createOrganization = asynchandler(async (req, res, next) => {
  try {
    const {
      name,
      logo_id,
      contact_id,
      language_id,
      website,
      address_id,
      currency_id,
    } = req.body;

    if (!name || !contact_id || !language_id || !address_id || !currency_id) {
      next(
        new ApiError(
          400,
          "Please provide all required fields: name, contact, language, address, and currency"
        )
      );
    }

    const nameExists = await organization.findOne({ where: { name } });
    if (nameExists) {
      throw new ApiError(400, "Organization Name already exists");
    }

    const contactExists = await contact.findByPk(contact_id);
    if (!contactExists) {
      throw new ApiError(404, "Contact Not Found");
    }

    if (logo_id) {
      const logoExists = await logo.findByPk(logo_id);
      if (!logoExists) {
        throw new ApiError(404, "Logo Not Found");
      }
    }

    const currencyExists = await currency.findByPk(currency_id);
    if (!currencyExists) {
      throw new ApiError(404, "Currency Not Found");
    }

    const addressExists = await address.findByPk(address_id);
    if (!addressExists) {
      throw new ApiError(404, "Address Not Found");
    }

    const languageExists = await language.findByPk(language_id);
    if (!languageExists) {
      throw new ApiError(404, "Language Not Found");
    }
    const emp_id = await employee.findOne({ user: req.user.id });
    if (!emp_id) {
      throw new ApiError(404, "Employee Not Found");
    }
    // }
    // const alreadyowned = await organization.findOne({
    //   where: { ownnedby: emp_id.id },
    // });
    // if (alreadyowned) {
    //   throw new ApiError(400, req.user.name + " already owns an organization");
    // }
    // console.log(emp_id);
    const newOrganization = await organization.create({
      name: name,
      logo_id: logo_id,
      contact: contact_id,
      language: language_id,
      website: website,
      address: address_id,
      currency: currency_id,
      // ownnedby: emp_id.id,
    });
    // newOrganization.ownnedby = req.user.name;
    emp_id.organization = newOrganization.id;
    const saveemp = await emp_id.save();
    if (!saveemp) {
      throw new ApiError(400, "Employee Not Saved");
    }
    res
      .status(201)
      .json(new ApiResponse(201, newOrganization, "Organization Created"));
  } catch (error) {
    next(error);
  }
});

// const getOrganizations = asynchandler(async (req, res, next) => {
//   const organizationList = await organization.findAll({
//     include: [
//       { model: logo, attributes: ["id", "logo_url"] },
//       { model: contact, attributes: ["id", "phone", "email"] },
//       { model: address, attributes: ["id", "city", "country"] },
//       { model: currency, attributes: ["id", "name", "symbol"] },
//       { model: language, attributes: ["id", "name"] },
//     ],
//   });

//   res
//     .status(200)
//     .json(new ApiResponse(200, organizationList, "Organization List"));
// });

// Get Organization by ID
const getOrganizationByID = asynchandler(async (req, res, next) => {
  const { id } = req.params;

  const organizationItem = await organization.findByPk(id);

  if (!organizationItem) {
    throw new ApiError(404, "Organization Not Found");
  }

  const logoItem = await logo.findByPk(organizationItem.logo_id, {

  });

  const contactItem = await contact.findByPk(organizationItem.contact, {

  });

  const addressItem = await address.findByPk(organizationItem.address, {

  });

  const currencyItem = await currency.findByPk(organizationItem.currency, {

  });

  const languageItem = await language.findByPk(organizationItem.language, {
    
  });

  res.status(200).json(
    new ApiResponse(
      200,
      {
        organization: organizationItem,
        logo: logoItem,
        contact: contactItem,
        address: addressItem,
        currency: currencyItem,
        language: languageItem,
      },
      "Organization Details"
    )
  );
});

const updateOrganization = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const {
    name,
    logo_id,
    contact_id,
    language_id,
    website,
    address_id,
    currency_id,
  } = req.body;

  const organizationItem = await organization.findByPk(id);

  if (!organizationItem) {
    throw new ApiError(404, "Organization Not Found");
  }

  if (name) {
    const nameExists = await organization.findOne({
      where: { name, id },
    });
    if (nameExists) {
      throw new ApiError(400, "Organization Name already exists");
    }
  }

  if (logo_id) {
    const logoExists = await logo.findByPk(logo_id);
    if (!logoExists) {
      throw new ApiError(404, "Logo Not Found");
    }
  }

  if (contact_id) {
    const contactExists = await contact.findByPk(contact_id);
    if (!contactExists) {
      throw new ApiError(404, "Contact Not Found");
    }
  }

  if (currency_id) {
    const currencyExists = await currency.findByPk(currency_id);
    if (!currencyExists) {
      throw new ApiError(404, "Currency Not Found");
    }
  }

  if (address_id) {
    const addressExists = await address.findByPk(address_id);
    if (!addressExists) {
      throw new ApiError(404, "Address Not Found");
    }
  }

  if (language_id) {
    const languageExists = await language.findByPk(language_id);
    if (!languageExists) {
      throw new ApiError(404, "Language Not Found");
    }
  }

  await organization.update(
    {
      name,
      logo_id,
      contact: contact_id,
      language: language_id,
      website,
      address: address_id,
      currency: currency_id,
    },
    { where: { id } }
  );

  const updatedOrganization = await organization.findByPk(id);

  res
    .status(200)
    .json(new ApiResponse(200, updatedOrganization, "Organization Updated"));
});

const deleteOrganization = asynchandler(async (req, res, next) => {
  const { id } = req.params;
  const organizationItem = await organization.findByPk(id);

  if (!organizationItem) {
    throw new ApiError(404, "Organization Not Found");
  }

  await organization.destroy({ where: { id } });

  res.status(200).json(new ApiResponse(200, null, "Organization Deleted"));
});
const fetchorganizationbyemployee = asynchandler(async (req, res, next) => {
  try {
    const owner = req.user;
    const employee_id = await employee.findOne({ where: { user: owner.id } });
    if (!employee_id) {
      throw new ApiError(404, "Employee Not Found");
    }
    // console.log(employee_id.id);
    // const allorganizations = await organization.findAll();
    // console.log(allorganizations);
    const organizationItem = await organization.findOne({
      where: { ownnedby: employee_id.id },
    });
    if (!organizationItem) {
      throw new ApiError(404, "Organization Not Found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, organizationItem.id, "Organization"));
  } catch (error) {
    next(error);
  }
});

export {
  createOrganization,
  // getOrganizations,
  getOrganizationByID,
  updateOrganization,
  deleteOrganization,
  fetchorganizationbyemployee,
};
