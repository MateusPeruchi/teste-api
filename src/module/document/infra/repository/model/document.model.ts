import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
  Unique,
  CreateDateColumn,
} from 'typeorm';
import { RequirementModel } from './requirement.model';

@Entity('document')
@Unique(['requirementId', 'version'])
export class DocumentModel {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'storage_key' })
  storageKey!: string;

  @Column()
  version!: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true })
  deletedAt!: Date | null;

  @ManyToOne(() => RequirementModel)
  @JoinColumn({ name: 'requirement_id' })
  requirement!: RequirementModel;

  @Column({ name: 'requirement_id' })
  requirementId!: string;
}
