import {
  Entity,
  PrimaryGeneratedColumn,
  Index,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { DocumentTypeModel } from './document-type.model';

@Entity('requirement')
@Index(
  'ux_requirement_employee_type_active',
  ['employeeId', 'documentTypeId'],
  {
    unique: true,
    where: '"deleted_at" IS NULL',
  },
)
export class RequirementModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'employee_id', type: 'uuid' })
  employeeId!: string;

  @ManyToOne(() => DocumentTypeModel)
  @JoinColumn({ name: 'document_type_id' })
  documentType!: DocumentTypeModel;

  @Column({ name: 'document_type_id', type: 'uuid' })
  documentTypeId!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;
}
