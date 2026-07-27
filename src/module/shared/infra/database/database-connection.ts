import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from '@/module/shared/infra/config/env.config';
import { DocumentTypeModel } from '@/module/document/infra/repository/model/document-type.model';
import { EmployeeModel } from '@/module/employee/infra/repository/model/employee.model';
import { DocumentModel } from '@/module/document/infra/repository/model/document.model';
import { RequirementModel } from '@/module/document/infra/repository/model/requirement.model';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: env.postgres.host,
  port: env.postgres.port,
  username: env.postgres.user,
  password: env.postgres.password,
  database: env.postgres.database,
  entities: [EmployeeModel, DocumentTypeModel, RequirementModel, DocumentModel],
  migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
