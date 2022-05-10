import { container } from "tsyringe";

import { IFieldsRepository } from "../../modules/fields/repositories/IFieldsRepository";
import { FieldsRepository } from "../../modules/fields/repositories/implementations/FieldsRepository";

container.registerSingleton<IFieldsRepository>(
  "FieldsRepository",
  FieldsRepository
);
