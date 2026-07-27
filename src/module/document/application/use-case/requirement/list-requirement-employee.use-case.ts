import { Injectable } from '@nestjs/common';
import { ListRequirementEmployeePaginatedQuery } from '@/module/document/infra/query/requirement/list-requirement-employee-paginated.query';

@Injectable()
export class ListRequirementEmployeeUseCase {
  constructor(
    private readonly listRequirementEmployeePaginatedQuery: ListRequirementEmployeePaginatedQuery,
  ) {}

  async execute(input: input): Promise<output> {
    const { data, total } =
      await this.listRequirementEmployeePaginatedQuery.execute({
        employeeId: input.employeeId,
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
  employeeId: string;
  includeDeleted: boolean;
  page: number;
  limit: number;
};

type output = {
  data: Array<{
    requirementId: string;
    name: string;
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
