import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateFieldTable1651794724055 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "fields",
        columns: [
          {
            name: "fieldId",
            type: "varchar",
            isPrimary: true,
          },
          {
            name: "label",
            type: "varchar",
          },
          {
            name: "position",
            type: "integer",
          },
          {
            name: "type",
            type: "enum",
            enum: ["text", "bigtext", "combo"],
          },
          {
            name: "typeRules",
            type: "json",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("fields");
  }
}
