import { DataSource } from 'typeorm';

export class ListDocumentEmployeeLatestPaginatedQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(input: input): Promise<output> {
    const { employeeId, page, limit } = input;
    const offset = (page - 1) * limit;

    const rows = await this.dataSource.query<outputQuery[]>(
      `select r.id          as "requirementId",
              dt.name       as "documentTypeName",
              d.id          as "documentId",
              d.version     as version,
              d.storage_key as "storageKey",
              d.created_at  as "sentAt"
         from requirement r
         join document_type dt on (dt.id = r.document_type_id)
        cross join lateral (select d.id,
                                   d.version,
                                   d.storage_key,
                                   d.created_at
                              from document d
                             where d.requirement_id = r.id
                               and d.deleted_at is null
                             order by d.version desc
                             limit 1) d
        where r.employee_id = $1
          and r.deleted_at is null
        order by d.created_at desc, r.id
        limit $2 offset $3`,
      [employeeId, limit, offset],
    );

    const countResult = await this.dataSource.query<{ total: string }[]>(
      `select count(*) as total
         from requirement r
        where r.employee_id = $1
          and r.deleted_at is null
          and exists (select 1
                        from document d
                       where d.requirement_id = r.id
                         and d.deleted_at is null)`,
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
  documentTypeName: string;
  documentId: string;
  version: number;
  storageKey: string;
  sentAt: Date;
};
