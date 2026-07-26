import { ConflictException, Injectable } from '@nestjs/common';
import { DocumentType } from '../../../domain/document-type';
import { DocumentTypeRepository } from '../../../infra/repository/document-type.repository';

@Injectable()
export class CreateDocumentTypeUseCase {
  constructor(
    private readonly documentTypeRepository: DocumentTypeRepository,
  ) {}

  async execute(input: input): Promise<output> {
    const existingDocumentTypeForName =
      await this.documentTypeRepository.getByName(input.name);
    if (existingDocumentTypeForName) {
      throw new ConflictException('Tipo de documento já cadastrado.');
    }

    const documentType = DocumentType.create(input.name);
    await this.documentTypeRepository.persist(documentType);
    return {
      id: documentType.getDocumentTypeId(),
    };
  }
}

type input = {
  name: string;
};

type output = {
  id: string;
};
