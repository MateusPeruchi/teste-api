import { Injectable, NotFoundException } from '@nestjs/common';
import { DocumentRepository } from '@/module/document/infra/repository/document.repository';

@Injectable()
export class DeleteDocumentUseCase {
  constructor(private readonly documentRepository: DocumentRepository) {}

  async execute(input: input): Promise<void> {
    const document = await this.documentRepository.getById(input.id);
    if (!document) throw new NotFoundException('Documento não encontrado.');
    if (!document.getIsDeleted()) {
      document.delete();
      await this.documentRepository.persist(document);
    }
  }
}

type input = {
  id: string;
};
