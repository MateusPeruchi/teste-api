import { DataSource } from 'typeorm';

export class ListDocumentEmployeePendingPaginatedQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(input: input): Promise<output> {
    const { employeeId, page, limit } = input;
    const offset = (page - 1) * limit;
    const filter = `where r.employee_id = $1
                      and r.deleted_at is null
                      and not exists (select 1
                                        from document d
                                       where d.requirement_id = r.id
                                         and d.deleted_at is null)`;

    const rows = await this.dataSource.query<outputQuery[]>(
      `select r.id         as "requirementId",
              dt.id        as "documentTypeId",
              dt.name      as "documentTypeName",
              r.created_at as "requiredSince"
         from requirement r
         join document_type dt on (dt.id = r.document_type_id)
        ${filter}
        order by r.created_at, r.id
        limit $2 offset $3`,
      [employeeId, limit, offset],
    );

    const countResult = await this.dataSource.query<{ total: string }[]>(
      `select count(*) as total
         from requirement r
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
  page: number;
  limit: number;
};

type output = {
  data: outputQuery[];
  total: number;
};

type outputQuery = {
  requirementId: string;
  documentTypeId: string;
  documentTypeName: string;
  requiredSince: Date;
};
