import { DataSource } from 'typeorm';

export class ListEmployeePaginatedQuery {
  constructor(private readonly dataSource: DataSource) {}

  async execute(input: input): Promise<output> {
    const { name, includeDeleted, page, limit } = input;
    const offset = (page - 1) * limit;
    const deletedFilter = includeDeleted ? '' : 'and deleted_at is null';
    const filter = `where ($1::text is null or name ilike $1) ${deletedFilter}`;
    const namePattern = name ? `%${name}%` : null;

    const rows = await this.dataSource.query<outputQuery[]>(
      `select id,
              name,
              email,
              created_at as "createdAt",
              deleted_at as "deletedAt"
         from employee
         ${filter}
        order by name asc, id
        limit $2 offset $3`,
      [namePattern, limit, offset],
    );

    const countResult = await this.dataSource.query<{ total: string }[]>(
      `select count(*) as total
         from employee
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
  includeDeleted: boolean;
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
  email: string;
  createdAt: Date;
  deletedAt: Date | null;
};
