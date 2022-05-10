import { getRepository, Repository } from "typeorm";

import { Field } from "../../entities/Field";
import { IFieldsRepository, ICreateFieldDTO } from "../IFieldsRepository";

class FieldsRepository implements IFieldsRepository {
  private repository: Repository<Field>;

  public constructor() {
    this.repository = getRepository(Field);
  }

  async create({
    fieldId,
    label,
    position,
    type,
    typeRules,
  }: ICreateFieldDTO): Promise<void> {
    const field = this.repository.create({
      fieldId,
      label,
      position,
      type,
      typeRules,
    });

    await this.repository.save(field);
  }

  async update({
    fieldId,
    label,
    position,
    type,
    typeRules,
  }: ICreateFieldDTO): Promise<void> {
    const field = this.repository.create({
      fieldId,
      label,
      position,
      type,
      typeRules,
    });
    await this.repository.update(field.fieldId, field);
  }

  async delete(field: Field): Promise<void> {
    await this.repository.remove(field);
  }

  async list(): Promise<Field[]> {
    const fields = await this.repository.find();
    return fields;
  }

  async count(): Promise<number> {
    return this.repository.count();
  }

  async findByFieldId(fieldId: string): Promise<Field> {
    return this.repository.findOne({ fieldId });
  }

  async findByPosition(position: number): Promise<Field> {
    return this.repository.findOne({ position });
  }
}

export { FieldsRepository };
