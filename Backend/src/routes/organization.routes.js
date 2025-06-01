import { Router } from "express";
import {
  createOrganization,
  // getOrganizations,
  getOrganizationByID,
  updateOrganization,
  deleteOrganization,
  fetchorganizationbyemployee,
} from "../controllers/organization.controller.js";

import AuthenticateToken from "../middlewares/Authenticate_token.js";

const organizationRouter = Router();

organizationRouter.post("/organization", AuthenticateToken, createOrganization);
// organizationRouter.get("/organization", AuthenticateToken, getOrganizations);
organizationRouter.get(
  "/organization/:id",
  AuthenticateToken,
  getOrganizationByID
);
organizationRouter.put(
  "/organization/:id",
  AuthenticateToken,
  updateOrganization
);
organizationRouter.delete(
  "/organization/:id",
  AuthenticateToken,
  deleteOrganization
);
organizationRouter.get(
  "/organization/owner/id/",
  AuthenticateToken,
  fetchorganizationbyemployee
);

export default organizationRouter;
