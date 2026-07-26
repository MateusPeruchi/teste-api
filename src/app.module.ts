import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { dataSourceOptions } from './module/shared/infra/database/database-connection';
import { APP_PIPE } from '@nestjs/core';
import { EmployeeModel } from './module/employee/infra/repository/model/employee.model';
import { DocumentModule } from './module/document/document.module';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: () => dataSourceOptions,
            dataSourceFactory: (options) =>
                Promise.resolve(
                    addTransactionalDataSource(
                        new DataSource(options ?? dataSourceOptions),
                    ),
                ),
        }),
        EmployeeModel,
        DocumentModule,
    ],
    providers: [
        {
            provide: APP_PIPE,
            useValue: new ValidationPipe({
                transform: true,
                whitelist: true,
            }),
        },
    ],
})
export class AppModule {}
