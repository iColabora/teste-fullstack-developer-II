import { inject, injectable } from "tsyringe";

import {
  IFieldsRepository,
  ICreateFieldDTO,
} from "../../repositories/IFieldsRepository";

@injectable()
class UpdateFieldUseCase {
  constructor(
    @inject("FieldsRepository")
    private fieldsRepository: IFieldsRepository
  ) {}

  async execute({
    fieldId,
    label,
    position,
    type,
    typeRules,
  }: ICreateFieldDTO): Promise<void> {
    const field = await this.fieldsRepository.findByFieldId(fieldId);

    if (!field) {
      throw new Error("Ops. O campo a ser atualizado não existe!");
    }

    const fieldWithPosition = await this.fieldsRepository.findByPosition(
      position
    );

    if (fieldWithPosition && fieldWithPosition.fieldId !== field.fieldId) {
      throw new Error("Ops. A posição selecionada já está em uso!");
    }

    await this.fieldsRepository.update({
      fieldId,
      label,
      position,
      type,
      typeRules,
    });
  }
}

export { UpdateFieldUseCase };
