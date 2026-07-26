import { DataSource } from 'typeorm';

export class GetDocumentPercentageSubmissionQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(): Promise<output> {
    const [row] = await this.dataSource.query<outputQuery[]>(
      `select count(*)                           as "totalRequirements",
              count(d.requirement_id)            as "submitted",
              count(*) - count(d.requirement_id) as "pending"
         from requirement r
         left join (select distinct requirement_id
                      from document
                     where deleted_at is null) d on (d.requirement_id = r.id)
        where r.deleted_at is null`,
    );

    return {
      totalRequirements: Number(row.totalRequirements),
      submitted: Number(row.submitted),
      pending: Number(row.pending),
    };
  }
}

type output = {
  totalRequirements: number;
  submitted: number;
  pending: number;
};

type outputQuery = {
  totalRequirements: string;
  submitted: string;
  pending: string;
};
