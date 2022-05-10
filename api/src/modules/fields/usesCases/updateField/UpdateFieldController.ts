import { Response, Request } from "express";
import { container } from "tsyringe";

import { UpdateFieldUseCase } from "./UpdateFieldUseCase";

class UpdateFieldController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { fieldId, label, position, type, typeRules } = request.body;

      const updateFieldUseCase = container.resolve(UpdateFieldUseCase);

      await updateFieldUseCase.execute({
        fieldId,
        label,
        position,
        type,
        typeRules,
      });

      return response
        .status(201)
        .json({ success: "Campo atualizado com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { UpdateFieldController };
