import { Field } from "../entities/Field";

interface IComboValueDTO {
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

interface ITextRulesDTO {
  maxlength: number;
}

interface ICreateFieldDTO {
  fieldId?: string;
  label: string;
  type: "text" | "bigtext" | "combo";
  position: number;
  typeRules: IComboValueDTO | ITextRulesDTO;
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
    typeRules,
  }: ICreateFieldDTO): Promise<void>;

  create({
    fieldId,
    label,
    type,
    position,
    typeRules,
  }: ICreateFieldDTO): Promise<void>;
}

export { IFieldsRepository, ICreateFieldDTO, IComboValueDTO, ITextRulesDTO };
