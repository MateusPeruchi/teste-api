import { Injectable } from '@nestjs/common';
import { RequirementModel } from './model/requirement.model';
import { Requirement } from '@/module/document/domain/requirement';
import { DefaultRepository } from '@/module/shared/infra/repository/default.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class RequirementRepository extends DefaultRepository<RequirementModel> {
  constructor(dataSource: DataSource) {
    super(RequirementModel, dataSource);
  }

  async persist(requirement: Requirement): Promise<void> {
    const model = this.create({
      id: requirement.getRequirementId(),
      employeeId: requirement.getEmployeeId(),
      documentTypeId: requirement.getDocumentTypeId(),
      createdAt: requirement.getCreatedAt(),
      deletedAt: requirement.getDeletedAt(),
    });
    await this.save(model);
  }

  async getById(id: string): Promise<Requirement | null> {
    const model = await this.findOne({
      where: { id },
      withDeleted: true,
    });
    if (model) {
      return new Requirement(
        model.id,
        model.employeeId,
        model.documentTypeId,
        model.createdAt,
        model.deletedAt,
      );
    }
    return null;
  }

  async existsByEmployeeAndDocumentType(input: {
    employeeId: string;
    documentTypeId: string;
  }): Promise<boolean> {
    const exists = await this.exists({
      where: {
        employeeId: input.employeeId,
        documentTypeId: input.documentTypeId,
      },
    });
    return exists;
  }
}
