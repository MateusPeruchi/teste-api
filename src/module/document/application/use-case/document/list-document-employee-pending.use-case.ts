import { Injectable } from '@nestjs/common';
import { ListDocumentEmployeePendingPaginatedQuery } from '@/module/document/infra/query/document/list-document-employee-pending-paginated.query';

@Injectable()
export class ListDocumentEmployeePendingUseCase {
  constructor(
    private readonly listDocumentEmployeePendingPaginatedQuery: ListDocumentEmployeePendingPaginatedQuery,
  ) {}

  async execute(input: input): Promise<output> {
    const { data, total } =
      await this.listDocumentEmployeePendingPaginatedQuery.execute({
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
    documentTypeId: string;
    documentTypeName: string;
    requiredSince: Date;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
