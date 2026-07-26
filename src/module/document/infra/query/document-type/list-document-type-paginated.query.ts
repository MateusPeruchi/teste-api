import { DataSource } from 'typeorm';

export class ListDocumentTypePaginatedQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(input: input): Promise<output> {
    const { name, page, limit } = input;
    const offset = (page - 1) * limit;
    const filter = `where ($1::text is null or name ilike $1)`;
    const namePattern = name ? `%${name}%` : null;

    const rows = await this.dataSource.query<outputQuery[]>(
      `select id,
              name,
              created_at as "createdAt"
         from document_type
         ${filter}
        order by name asc
        limit $2 offset $3`,
      [namePattern, limit, offset],
    );

    const countResult = await this.dataSource.query<{ total: string }[]>(
      `select count(*) as total
         from document_type
         ${filter}`,
      [namePattern],
    );

    return {
      data: rows,
      total: Number(countResult[0].total),
    };
  }
}

type input = {
  name?: string;
  page: number;
  limit: number;
};

type output = {
  data: outputQuery[];
  total: number;
};

type outputQuery = {
  id: string;
  name: string;
  createdAt: Date;
};
