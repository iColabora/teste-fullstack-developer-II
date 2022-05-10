import { Response, Request } from "express";
import { container } from "tsyringe";

import { CreateFieldUseCase } from "./CreateFieldUseCase";

class CreateFieldController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { fieldId, label, type, position, typeRules } = request.body;

      const createFieldUseCase = container.resolve(CreateFieldUseCase);

      await createFieldUseCase.execute({
        fieldId,
        label,
        type,
        position,
        typeRules,
      });

      return response
        .status(201)
        .json({ success: "Campo criado com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { CreateFieldController };
