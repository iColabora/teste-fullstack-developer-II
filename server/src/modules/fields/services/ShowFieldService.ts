import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Field from '../infra/typeorm/schemas/Field';
import IFieldsRepository from '../repositories/IFieldsRepository';

interface IRequest {
  uid: string;
}

@injectable()
class ShowFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  public async execute({ uid }: IRequest): Promise<Field> {
    try {
      const item = await this.fieldsRepository.findByUid(uid);

      if (!item) {
        throw new AppError({
          message: 'Field Not Found',
          statusCode: 404,
          code: 'fields.notFound',
        });
      }

      return item;
    } catch (error) {
      throw new AppError(error as Error);
    }
  }
}

export default ShowFieldService;
