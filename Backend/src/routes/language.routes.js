import { Router } from "express";
import {
  getLanguages,
  getLanguageById,
  addLanguage,
  updateLanguage,
  deleteLanguage,
} from "../controllers/language.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const LanguageRouter = Router();

LanguageRouter.route("/languages").get(AuthenticateToken, getLanguages);
LanguageRouter.route("/language/:id").get(AuthenticateToken, getLanguageById);
LanguageRouter.route("/language").post(AuthenticateToken, addLanguage);
LanguageRouter.route("/language/:id").put(AuthenticateToken, updateLanguage);
LanguageRouter.route("language/:id").delete(AuthenticateToken, deleteLanguage);

export default LanguageRouter;
