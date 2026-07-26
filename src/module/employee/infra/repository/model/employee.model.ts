import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('employee')
export class EmployeeModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  email!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
