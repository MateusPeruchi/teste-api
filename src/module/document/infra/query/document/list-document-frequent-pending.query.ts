import { DataSource } from 'typeorm';

export class ListDocumentFrequentPendingQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(): Promise<output> {
    const rows = await this.dataSource.query<outputQuery[]>(
      `select dt.id    as "documentTypeId",
              dt.name  as "documentTypeName",
              count(*) as "pendingCount"
         from requirement r
         join document_type dt on (dt.id = r.document_type_id)
        where r.deleted_at is null
          and not exists (select 1
                            from document d
                           where d.requirement_id = r.id
                             and d.deleted_at is null)
        group by dt.id, dt.name
        order by count(*) desc, dt.name`,
    );

    return {
      data: rows.map((row) => ({
        documentTypeId: row.documentTypeId,
        documentTypeName: row.documentTypeName,
        pendingCount: Number(row.pendingCount),
      })),
    };
  }
}

type output = {
  data: Array<{
    documentTypeId: string;
    documentTypeName: string;
    pendingCount: number;
  }>;
};

type outputQuery = {
  documentTypeId: string;
  documentTypeName: string;
  pendingCount: string;
};
