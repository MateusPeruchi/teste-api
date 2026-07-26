import { DataSource } from 'typeorm';

export class ListDocumentSubmissionLatestPaginatedQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(input: input): Promise<output> {
    const { page, limit } = input;
    const offset = (page - 1) * limit;
    const startDate = input.startDate ?? null;
    const endDate = input.endDate ?? null;
    const employeeId = input.employeeId ?? null;

    const rows = await this.dataSource.query<outputQuery[]>(
      `select d.id,
              d.version,
              d.created_at as "createdAt",
              dt.name      as "documentTypeName",
              e.email      as "employeeEmail",
              d.deleted_at as "deletedAt"
         from document d
         join requirement r on (r.id = d.requirement_id)
         join document_type dt on (dt.id = r.document_type_id)
         join employee e on (e.id = r.employee_id)
        where ($1::timestamp is null or d.created_at >= $1)
          and ($2::timestamp is null or d.created_at < $2)
          and ($3::uuid is null or r.employee_id = $3)
        order by d.created_at desc, d.id
        limit $4 offset $5`,
      [startDate, endDate, employeeId, limit, offset],
    );

    const countResult = await this.dataSource.query<{ total: string }[]>(
      `select count(*) as total
         from document d
         join requirement r on (r.id = d.requirement_id)
         join document_type dt on (dt.id = r.document_type_id)
         join employee e on (e.id = r.employee_id)
        where ($1::timestamp is null or d.created_at >= $1)
          and ($2::timestamp is null or d.created_at < $2)
          and ($3::uuid is null or r.employee_id = $3)`,
      [startDate, endDate, employeeId],
    );

    return {
      data: rows,
      total: Number(countResult[0].total),
    };
  }
}

type input = {
  startDate?: Date;
  endDate?: Date;
  employeeId?: string;
  page: number;
  limit: number;
};

type output = {
  data: outputQuery[];
  total: number;
};

type outputQuery = {
  id: string;
  version: number;
  createdAt: Date;
  documentTypeName: string;
  employeeEmail: string;
  deletedAt: Date | null;
};
