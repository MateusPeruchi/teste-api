import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { addTransactionalDataSource } from 'typeorm-transactional';
import { dataSourceOptions } from './module/shared/infra/database/database-connection';
import { APP_PIPE } from '@nestjs/core';

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
