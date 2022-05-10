import { inject, injectable } from "tsyringe";

import { Field } from "../../entities/Field";
import { IFieldsRepository } from "../../repositories/IFieldsRepository";

@injectable()
class ListFieldsUseCase {
  constructor(
    @inject("FieldsRepository")
    private fildsRepository: IFieldsRepository
  ) {}

  async execute(): Promise<Field[]> {
    const fields = await this.fildsRepository.list();
    return fields;
  }
}

export { ListFieldsUseCase };
