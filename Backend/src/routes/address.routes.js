import { Router } from "express";
import {
  createAddress,
  getAddress,
  getAddressByID,
  updateAddress,
  deleteAddress,
} from "../controllers/address.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";


const AddressRouter = Router();

AddressRouter.route("/address").post(AuthenticateToken, createAddress);
AddressRouter.route("/address").get(AuthenticateToken, getAddress);
AddressRouter.route("/address/:id").get(AuthenticateToken, getAddressByID);
AddressRouter.route("/address/:id").put(AuthenticateToken, updateAddress);
AddressRouter.route("/address/:id").delete(AuthenticateToken, deleteAddress);

export default AddressRouter;
