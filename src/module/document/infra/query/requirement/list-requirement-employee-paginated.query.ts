import { DataSource } from 'typeorm';

export class ListRequirementEmployeePaginatedQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(input: input): Promise<output> {
    const { employeeId, includeDeleted, page, limit } = input;
    const offset = (page - 1) * limit;
    const filter = includeDeleted ? '' : 'and r.deleted_at is null';

    const rows = await this.dataSource.query<outputQuery[]>(
      `select r.id as "requirementId",
              dt."name",
              r.created_at as "createdAt",
              r.deleted_at as "deletedAt"
         from requirement r join 
              document_type dt on (dt.id = r.document_type_id)
        where r.employee_id = $1
           ${filter}
        order by r.created_at desc, r.id
        limit $2 offset $3`,
      [employeeId, limit, offset],
    );

    const countResult = await this.dataSource.query<{ total: string }[]>(
      `select count(*) as total
        from requirement r
       where r.employee_id = $1
         ${filter}`,
      [employeeId],
    );

    return {
      data: rows,
      total: Number(countResult[0].total),
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
  data: outputQuery[];
  total: number;
};

type outputQuery = {
  requirementId: string;
  name: string;
  createdAt: Date;
  deletedAt: Date | null;
};
