import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DocumentTypeModel } from './model/document-type.model';
import { DocumentType } from '@/module/document/domain/document-type';
import { DefaultRepository } from '@/module/shared/infra/repository/default.repository';

@Injectable()
export class DocumentTypeRepository extends DefaultRepository<DocumentTypeModel> {
  constructor(dataSource: DataSource) {
    super(DocumentTypeModel, dataSource);
  }

  async persist(documentType: DocumentType): Promise<void> {
    const model = this.create({
      id: documentType.getDocumentTypeId(),
      name: documentType.getName(),
      createdAt: documentType.getCreatedAt(),
    });
    await this.save(model);
  }

  async getById(id: string): Promise<DocumentType | null> {
    const model = await this.findOne({ where: { id } });
    if (model) {
      return new DocumentType(model.id, model.name, model.createdAt);
    }
    return null;
  }

  async getByName(name: string): Promise<DocumentType | null> {
    const model = await this.findOne({ where: { name } });
    if (model) {
      return new DocumentType(model.id, model.name, model.createdAt);
    }
    return null;
  }
}
