import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import { createContactSchema, updateContactSchema, favouriteContactSchema } from '../schemas/contactShema.js';
import { validateBody } from '../helpers/validateBody.js';
import { isValidId } from '../middlewares/isValidid.js';


const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id",isValidId, getOneContact);

contactsRouter.delete("/:id",isValidId, deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id",isValidId, validateBody(updateContactSchema), updateContact);

contactsRouter.patch("/:id/favorite",isValidId, validateBody(favouriteContactSchema), updateStatusContact);

export default contactsRouter;
