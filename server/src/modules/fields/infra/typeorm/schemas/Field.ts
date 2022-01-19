import {
  Entity,
  ObjectID,
  ObjectIdColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type FieldType = 'text' | 'bigtext' | 'combo';

@Entity('fields')
class Field {
  @ObjectIdColumn()
  uid: ObjectID;

  @Column()
  label: string;

  @Column()
  id: string;

  @Column()
  order: number;

  @Column({
    type: 'enum',
    enum: ['text', 'bigtext', 'combo'],
    default: 'text',
  })
  type: FieldType;

  @Column({
    transformer: {
      to: val => val,
      from: val => {
        console.log(val);
        return val;
      },
    },
  })
  options: string[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Field;
