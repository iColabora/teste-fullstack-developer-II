import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

import {
  IComboValueDTO,
  ITextRulesDTO,
} from "../repositories/IFieldsRepository";

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
  typeRules?: IComboValueDTO | ITextRulesDTO;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.typeRules) {
      this.typeRules = {
        maxlength: this.type === "text" ? 30 : 100,
      };
    }
  }
}

export { Field };
