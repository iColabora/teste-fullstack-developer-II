import { injectable, inject } from 'tsyringe';
import { DeleteResult } from 'typeorm';

import AppError from '@shared/errors/AppError';

import IFieldsRepository from '../repositories/IFieldsRepository';

interface IRequest {
  uid: string;
}

@injectable()
class DeleteFieldService {
  constructor(
    @inject('FieldsRepository')
    private fieldsRepository: IFieldsRepository
  ) {}

  public async execute({ uid }: IRequest): Promise<DeleteResult> {
    try {
      const result = await this.fieldsRepository.delete(uid);

      return result;
    } catch (error) {
      throw new AppError(error as Error);
    }
  }
}

export default DeleteFieldService;
