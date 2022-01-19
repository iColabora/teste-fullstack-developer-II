import { validate } from "../middlewares/validate.middleware";
import { icolaboraSchema } from "../models/icolabora.schema";
import { Router } from "express";
import Icolabora from "../controllers/icolabora.controller";

const router = Router();

export const icolaboraRoute = () => {
  router.post("", validate(icolaboraSchema), Icolabora.create);
  router.get("", Icolabora.list);

  return router;
};
