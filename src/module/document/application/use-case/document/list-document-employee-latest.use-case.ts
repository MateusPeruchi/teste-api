import { Injectable } from '@nestjs/common';
import { ListDocumentEmployeeLatestPaginatedQuery } from '../../../infra/query/document/list-document-employee-latest-paginated.query';

@Injectable()
export class ListDocumentEmployeeLatestUseCase {
  constructor(
    private readonly listDocumentEmployeeLatestPaginatedQuery: ListDocumentEmployeeLatestPaginatedQuery,
  ) {}

  async execute(input: input): Promise<output> {
    const { data, total } =
      await this.listDocumentEmployeeLatestPaginatedQuery.execute({
        employeeId: input.employeeId,
        page: input.page,
        limit: input.limit,
      });

    return {
      data,
      meta: {
        total,
        page: input.page,
        limit: input.limit,
        totalPages: Math.ceil(total / input.limit),
      },
    };
  }
}

type input = {
  employeeId: string;
  page: number;
  limit: number;
};

type output = {
  data: Array<{
    requirementId: string;
    documentTypeName: string;
    documentId: string;
    version: number;
    storageKey: string;
    sentAt: Date;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
