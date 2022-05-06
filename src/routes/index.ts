import { Router } from "express";

import { fieldsRoutes } from "./fields.routes";

const router = Router();

router.use("/fields", fieldsRoutes);

export { router };
