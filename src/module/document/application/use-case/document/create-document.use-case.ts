import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { runInTransaction } from 'typeorm-transactional';
import { DocumentRepository } from '../../../infra/repository/document.repository';
import { RequirementRepository } from '../../../infra/repository/requirement.repository';
import { Document } from '../../../domain/document';
import { StorageGateway } from '../../../infra/gateway/storage.gateway';

@Injectable()
export class CreateDocumentUseCase {
  constructor(
    private readonly documentRepository: DocumentRepository,
    private readonly requirementRepository: RequirementRepository,
    private readonly storageGateway: StorageGateway,
  ) {}

  async execute(input: input): Promise<output> {
    const requirement = await this.requirementRepository.getById(
      input.requirementId,
    );
    if (!requirement) {
      throw new NotFoundException('Exigência não encontrada.');
    }
    if (requirement.getIsDeleted()) {
      throw new ConflictException('Esta exigência foi removida.');
    }

    const documentHistory = await this.documentRepository.listByRequirementId(
      input.requirementId,
    );
    const lastVersion = documentHistory[0]?.getVersion() ?? 0;
    const previousDocuments = documentHistory.filter(
      (document) => !document.getIsDeleted(),
    );

    const document = Document.create(input.requirementId, lastVersion);

    try {
      await this.storageGateway.upload(document.getStorageKey(), input.file);
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível armazenar o documento.',
        { cause: error },
      );
    }

    try {
      await runInTransaction(async () => {
        await this.documentRepository.persist(document);

        for (const previousDocument of previousDocuments) {
          previousDocument.delete();
          await this.documentRepository.persist(previousDocument);
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(
        'Não foi possível registrar o envio do documento.',
        { cause: error },
      );
    }

    return { id: document.getDocumentId() };
  }
}

type input = {
  requirementId: string;
  file: string;
};

type output = {
  id: string;
};
