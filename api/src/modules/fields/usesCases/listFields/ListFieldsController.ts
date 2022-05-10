import { Response, Request } from "express";
import { container } from "tsyringe";

import { ListFieldsUseCase } from "./ListFieldsUseCase";

class ListFieldsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const listFieldsUseCase = container.resolve(ListFieldsUseCase);
    const allFields = await listFieldsUseCase.execute();

    return response.json(allFields);
  }
}

export { ListFieldsController };
