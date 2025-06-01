import logo from "../models/logo.model.js";
import { Router } from "express";
import AuthenticateToken from "../middlewares/Authenticate_token.js";
import { upload } from "../middlewares/multer.js";
import {
  getLogos,
  getLogoById,
  addLogo,
  updateLogo,
  deleteLogo,
} from "../controllers/logo.controller.js";

const LogoRouter = Router();

LogoRouter.route("/logos").get(AuthenticateToken, getLogos);
LogoRouter.route("/logo/:id").get(AuthenticateToken, getLogoById);
LogoRouter.route("/logo").post(
  upload.single("image"),
  AuthenticateToken,
  addLogo
);
LogoRouter.route("/logo/:id").put(
  upload.single("image"),
  AuthenticateToken,
  updateLogo
);
LogoRouter.route("/logo/:id").delete(AuthenticateToken, deleteLogo);

export default LogoRouter;
