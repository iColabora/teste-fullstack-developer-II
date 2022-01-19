import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Field from '../infra/typeorm/schemas/Field';

import IFieldsRepository from '../repositories/IFieldsRepository';

import ICreateFieldDTO from '../dtos/ICreateFieldDTO';

@injectable()
class CreateFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  public async execute({
    id,
    label,
    type,
    order,
    options,
  }: ICreateFieldDTO): Promise<Field> {
    try {
      const exists = await this.fieldsRepository.findById(id);

      if (exists) {
        throw new AppError({
          message: 'Already exists a field with this id',
          code: 'fields.idInUse',
        });
      }

      const response = await this.fieldsRepository.create({
        label,
        id,
        type,
        order,
        options,
      });

      return response;
    } catch (error) {
      throw new AppError(error as Error);
    }
  }
}

export default CreateFieldService;
