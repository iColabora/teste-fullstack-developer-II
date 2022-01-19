import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Field from '../infra/typeorm/schemas/Field';
import IFieldsRepository from '../repositories/IFieldsRepository';

@injectable()
class ListFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  public async execute(): Promise<Field[]> {
    try {
      const list = await this.fieldsRepository.list();

      return list;
    } catch (error) {
      throw new AppError(error as Error);
    }
  }
}

export default ListFieldService;
