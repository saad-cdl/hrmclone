import { Router } from "express";
import {
    CreateCurrency,
    GetCurrency,
    GetCurrencyByID,
    UpdateCurrency,
    DeleteCurrency,
} from "../controllers/currency.controller.js";
import AuthenticateToken from "../middlewares/Authenticate_token.js";

const currencyRouter = Router();

currencyRouter.get("/currency", AuthenticateToken, GetCurrency);
currencyRouter.get("/currency/:id", AuthenticateToken, GetCurrencyByID);
currencyRouter.post("/currency", AuthenticateToken, CreateCurrency);
currencyRouter.put("/currency/:id", AuthenticateToken, UpdateCurrency);
currencyRouter.delete("/currency/:id", AuthenticateToken, DeleteCurrency);

export default currencyRouter;
