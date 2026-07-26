import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { env } from '../config/env.config';
import { EmployeeModel } from '../../../employee/infra/repository/model/employee.model';
import { RequirementModel } from '../../../document/infra/repository/model/requirement.model';
import { DocumentModel } from '../../../document/infra/repository/model/document.model';
import { DocumentTypeModel } from '../../../document/infra/repository/model/document-type.model';

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: env.postgres.host,
    port: env.postgres.port,
    username: env.postgres.user,
    password: env.postgres.password,
    database: env.postgres.database,
    entities: [
        EmployeeModel,
        RequirementModel,
        DocumentModel,
        DocumentTypeModel,
    ],
    migrations: [join(__dirname, 'migrations', '*{.ts,.js}')],
    synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);
