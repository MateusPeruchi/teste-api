import { Injectable } from '@nestjs/common';
import { ListEmployeePaginatedQuery } from '../../infra/query/list-employee-paginated.query';

@Injectable()
export class ListEmployeeUseCase {
  constructor(
    private readonly listEmployeePaginatedQuery: ListEmployeePaginatedQuery,
  ) {}

  async execute(input: input): Promise<output> {
    const { data, total } = await this.listEmployeePaginatedQuery.execute({
      name: input.name,
      includeDeleted: input.includeDeleted,
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
  includeDeleted: boolean;
  page: number;
  limit: number;
};

type output = {
  data: Array<{
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    deletedAt: Date | null;
  }>;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};
