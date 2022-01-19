import { DeleteResult } from 'typeorm';

import Field from '../infra/typeorm/schemas/Field';
import ICreateFieldDTO from '../dtos/ICreateFieldDTO';

export default interface IFieldsRepository {
  list(): Promise<Field[]>;
  findById(id: string): Promise<Field | undefined>;
  findByUid(uid: string): Promise<Field | undefined>;
  create(data: ICreateFieldDTO): Promise<Field>;
  save(data: Field): Promise<Field>;
  delete(uid: string): Promise<DeleteResult>;
}
