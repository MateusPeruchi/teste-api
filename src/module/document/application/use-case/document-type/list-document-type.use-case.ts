import { Injectable } from '@nestjs/common';
import { ListDocumentTypePaginatedQuery } from '@/module/document/infra/query/document-type/list-document-type-paginated.query';

@Injectable()
export class ListDocumentTypeUseCase {
  constructor(
    private readonly listDocumentTypePaginatedQuery: ListDocumentTypePaginatedQuery,
  ) {}

  async execute(input: input): Promise<output> {
    const { data, total } = await this.listDocumentTypePaginatedQuery.execute({
      name: input.name,
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
  name?: string;
  page: number;
  limit: number;
};

type output = {
  data: Array<{
    id: string;
    name: string;
    createdAt: Date;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
