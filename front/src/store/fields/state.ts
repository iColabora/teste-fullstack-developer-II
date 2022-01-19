export type FieldType = 'text' | 'bigtext' | 'combo';

export interface IField {
  uid: string | null;
  id: string | null;
  label: string | null;
  type: FieldType | null;
  order: number | null;
  options: string[];
}

export interface FieldsStateInterface {
  list: IField[];
}

function state(): FieldsStateInterface {
  return {
    list: [],
  };
}

export default state;
