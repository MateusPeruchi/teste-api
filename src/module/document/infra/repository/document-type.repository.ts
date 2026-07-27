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

  async existsById(id: string): Promise<boolean> {
    const exists = await this.exists({ where: { id } });
    return exists;
  }

  async existsByName(name: string): Promise<boolean> {
    const exists = await this.exists({ where: { name } });
    return exists;
  }
}
