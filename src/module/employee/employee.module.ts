import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EmployeeModel } from './infra/repository/model/employee.model';
import { EmployeeController } from './infra/controller/employee.controller';
import { CreateEmployeeUseCase } from './application/use-case/create-employee.use-case';
import { GetEmployeeUseCase } from './application/use-case/get-employee.use-case';
import { DeleteEmployeeUseCase } from './application/use-case/delete-employee.use-case';
import { EmployeeRepository } from './infra/repository/employee.repository';
import { ListEmployeeUseCase } from './application/use-case/list-employee.use-case';
import { ListEmployeePaginatedQuery } from './infra/query/list-employee-paginated.query';

@Module({
  imports: [TypeOrmModule.forFeature([EmployeeModel])],
  controllers: [EmployeeController],
  providers: [
    CreateEmployeeUseCase,
    GetEmployeeUseCase,
    DeleteEmployeeUseCase,
    ListEmployeeUseCase,
    EmployeeRepository,
    {
      provide: ListEmployeePaginatedQuery,
      useFactory: (dataSource: DataSource) =>
        new ListEmployeePaginatedQuery(dataSource),
      inject: [DataSource],
    },
  ],
})
export class EmployeeModule {}
