import { Injectable } from '@nestjs/common';
import { ListDocumentFrequentPendingQuery } from '@/module/document/infra/query/document/list-document-frequent-pending.query';

@Injectable()
export class ListDocumentFrequentPendingUseCase {
  constructor(
    private readonly listDocumentFrequentPendingQuery: ListDocumentFrequentPendingQuery,
  ) {}

  async execute(): Promise<output> {
    const { data } = await this.listDocumentFrequentPendingQuery.execute();

    return {
      data,
    };
  }
}

type output = {
  data: Array<{
    documentTypeId: string;
    documentTypeName: string;
    pendingCount: number;
  }>;
};
