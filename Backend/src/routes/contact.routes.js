import { Router } from "express";
import {
  CreateContact,
  GetContact,
  GetContactByID,
  UpdateContact,
  DeleteContact,
} from "../controllers/contact.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const contactRouter = Router();

contactRouter.post("/contact", AuthenticateToken, CreateContact);
contactRouter.get("/contact", AuthenticateToken, GetContact); // This route is not used in the frontend
contactRouter.get("/contact/:id", AuthenticateToken, GetContactByID);
contactRouter.put("/contact/:id", AuthenticateToken, UpdateContact);
contactRouter.delete("/contact/:id", AuthenticateToken, DeleteContact);

export default contactRouter;
