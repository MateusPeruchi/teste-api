import { BadRequestException, Injectable } from '@nestjs/common';
import { ListDocumentSubmissionLatestPaginatedQuery } from '../../../infra/query/document/list-document-submission-latest-paginated.query';

@Injectable()
export class ListDocumentSubmissionLatestUseCase {
  constructor(
    private readonly listDocumentSubmissionLatestPaginatedQuery: ListDocumentSubmissionLatestPaginatedQuery,
  ) {}

  async execute(input: input): Promise<output> {
    if (input.startDate && input.endDate && input.startDate > input.endDate) {
      throw new BadRequestException(
        'A data inicial deve ser anterior à data final.',
      );
    }

    const { data, total } =
      await this.listDocumentSubmissionLatestPaginatedQuery.execute({
        startDate: input.startDate,
        endDate: input.endDate,
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
  startDate?: Date;
  endDate?: Date;
  page: number;
  limit: number;
};

type output = {
  data: Array<{
    id: string;
    version: number;
    createdAt: Date;
    documentTypeName: string;
    employeeEmail: string;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
