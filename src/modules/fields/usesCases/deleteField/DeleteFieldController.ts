import { Response, Request } from "express";
import { container } from "tsyringe";

import { DeleteFieldUseCase } from "./DeleteFieldUseCase";

class DeleteFieldController {
  async handle(request: Request, response: Response): Promise<Response> {
    try {
      const { fieldId } = request.params;

      const deleteFieldUseCase = container.resolve(DeleteFieldUseCase);

      await deleteFieldUseCase.execute(fieldId);

      return response
        .status(200)
        .json({ success: "Campo deletado com sucesso!" });
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}

export { DeleteFieldController };
