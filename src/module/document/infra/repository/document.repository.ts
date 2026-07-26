import { Injectable } from '@nestjs/common';
import { Document } from '../../domain/document';
import { DocumentModel } from './model/document.model';
import { DefaultRepository } from '../../../shared/infra/repository/default.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class DocumentRepository extends DefaultRepository<DocumentModel> {
  constructor(dataSource: DataSource) {
    super(DocumentModel, dataSource);
  }

  async persist(document: Document): Promise<void> {
    const model = this.create({
      id: document.getDocumentId(),
      requirementId: document.getRequirementId(),
      storageKey: document.getStorageKey(),
      version: document.getVersion(),
      createdAt: document.getCreatedAt(),
      deletedAt: document.getDeletedAt(),
    });
    await this.save(model);
  }

  async getById(id: string): Promise<Document | null> {
    const model = await this.findOne({
      where: { id },
      withDeleted: true,
    });
    if (model) {
      return new Document(
        model.id,
        model.requirementId,
        model.storageKey,
        model.version,
        model.createdAt,
        model.deletedAt,
      );
    }
    return null;
  }

  async listByRequirementId(requirementId: string): Promise<Document[]> {
    const models = await this.find({
      where: { requirementId },
      order: { version: 'DESC' },
      withDeleted: true,
    });

    return models.map(
      (model) =>
        new Document(
          model.id,
          model.requirementId,
          model.storageKey,
          model.version,
          model.createdAt,
          model.deletedAt,
        ),
    );
  }
}
