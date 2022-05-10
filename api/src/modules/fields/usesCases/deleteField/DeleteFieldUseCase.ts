import { inject, injectable } from "tsyringe";

import { IFieldsRepository } from "../../repositories/IFieldsRepository";

@injectable()
class DeleteFieldUseCase {
  constructor(
    @inject("FieldsRepository")
    private fieldsRepository: IFieldsRepository
  ) {}

  async execute(fieldId: string): Promise<void> {
    const field = await this.fieldsRepository.findByFieldId(fieldId);

    if (!field) {
      throw new Error("Ops. Campo não encontrado!");
    }

    await this.fieldsRepository.delete(field);
  }
}

export { DeleteFieldUseCase };
