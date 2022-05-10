import { Router } from "express";

import { CreateFieldController } from "../modules/fields/usesCases/createField/CreateFieldController";
import { DeleteFieldController } from "../modules/fields/usesCases/deleteField/DeleteFieldController";
import { ListFieldsController } from "../modules/fields/usesCases/listFields/ListFieldsController";
import { UpdateFieldController } from "../modules/fields/usesCases/updateField/UpdateFieldController";

const fieldsRoutes = Router();

const createFieldController = new CreateFieldController();
const deleteFieldController = new DeleteFieldController();
const listFieldsController = new ListFieldsController();
const updateFieldController = new UpdateFieldController();

fieldsRoutes.post("/", createFieldController.handle);
fieldsRoutes.delete("/:fieldId", deleteFieldController.handle);
fieldsRoutes.put("/:fieldId", updateFieldController.handle);
fieldsRoutes.get("/", listFieldsController.handle);

export { fieldsRoutes };
