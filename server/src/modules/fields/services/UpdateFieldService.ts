import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Field, { FieldType } from '../infra/typeorm/schemas/Field';
import IFieldsRepository from '../repositories/IFieldsRepository';

interface IRequest {
  uid: string;
  id: string;
  label: string;
  type: FieldType;
  order: number;
  options: string[];
}

@injectable()
class UpdateFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  public async execute({
    uid,
    id,
    label,
    type,
    order,
    options,
  }: IRequest): Promise<Field> {
    try {
      let item = await this.fieldsRepository.findByUid(uid);

      if (!item) {
        throw new AppError({
          message: 'Field Not Found',
          statusCode: 404,
          code: 'fields.notFound',
        });
      }

      item = Object.assign(item, {
        id,
        label,
        type,
        order,
        options,
      });

      const response = await this.fieldsRepository.save(item);

      return response;
    } catch (error) {
      throw new AppError(error as Error);
    }
  }
}

export default UpdateFieldService;
