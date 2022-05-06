import { Field } from "../entities/Field";

interface IInputValueDTO {
  firstOption: {
    description: string;
    value: string;
  };

  secondOption: {
    description: string;
    value: string;
  };

  thirdOption: {
    description: string;
    value: string;
  };
}

interface ICreateFieldDTO {
  fieldId?: string;
  label: string;
  type: "text" | "bigtext" | "combo";
  position: number;
  inputValue: IInputValueDTO | null;
}

interface IFieldsRepository {
  findByFieldId(fieldId: string): Promise<Field>;

  findByPosition(position: number): Promise<Field>;

  list(): Promise<Field[]>;

  count(): Promise<number>;

  delete(field: Field): Promise<void>;

  update({
    fieldId,
    label,
    type,
    position,
    inputValue,
  }: ICreateFieldDTO): Promise<void>;

  create({
    fieldId,
    label,
    type,
    position,
    inputValue,
  }: ICreateFieldDTO): Promise<void>;
}

export { IFieldsRepository, ICreateFieldDTO, IInputValueDTO };
