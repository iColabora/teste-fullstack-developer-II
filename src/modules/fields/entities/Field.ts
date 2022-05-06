import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import { IInputValueDTO } from "../repositories/IFieldsRepository";

@Entity("fields")
class Field {
  @PrimaryColumn()
  fieldId: string;

  @Column()
  label: string;

  @Column({
    type: "enum",
    enum: ["text", "bigtext", "combo"],
    default: "text",
  })
  type: "text" | "bigtext" | "combo";

  @Column()
  position: number;

  @Column({ type: "json", nullable: true })
  inputValue: IInputValueDTO | null;

  @CreateDateColumn()
  created_at: Date;
}

export { Field };
