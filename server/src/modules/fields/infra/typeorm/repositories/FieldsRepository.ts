import { DeleteResult, getMongoRepository, MongoRepository } from 'typeorm';

import ICreateFieldDTO from '../../../dtos/ICreateFieldDTO';

import IFieldsRepository from '../../../repositories/IFieldsRepository';
import Field from '../schemas/Field';

class FieldsRepository implements IFieldsRepository {
  private ormRepository: MongoRepository<Field>;

  constructor() {
    this.ormRepository = getMongoRepository(Field, 'default');
  }

  public async list(): Promise<Field[]> {
    const items = await this.ormRepository.find();

    return items;
  }

  public async findById(id: string): Promise<Field | undefined> {
    const item = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return item;
  }

  public async findByUid(uid: string): Promise<Field | undefined> {
    const item = await this.ormRepository.findOne(uid);

    return item;
  }

  public async findByName(name: string): Promise<Field | undefined> {
    const item = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return item;
  }

  public async create({
    id,
    label,
    type,
    order,
    options,
  }: ICreateFieldDTO): Promise<Field> {
    const item = this.ormRepository.create({
      id,
      label,
      type,
      order,
      options,
    });

    const response = await this.ormRepository.save(item);

    return response;
  }

  public async save(data: Field): Promise<Field> {
    const item = await this.ormRepository.save(data);

    return item;
  }

  public async delete(uid: string): Promise<DeleteResult> {
    const result = await this.ormRepository.delete(uid);

    return result;
  }
}

export default FieldsRepository;
