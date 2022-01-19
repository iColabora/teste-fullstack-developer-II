import { FieldType } from '../infra/typeorm/schemas/Field';

export default interface ICreateFieldDTO {
  label: string;
  id: string;
  type: FieldType;
  order: number;
  options: string[];
}
