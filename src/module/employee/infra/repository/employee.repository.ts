import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Employee } from '@/module/employee/domain/employee';
import { EmployeeModel } from './model/employee.model';
import { DefaultRepository } from '@/module/shared/infra/repository/default.repository';

@Injectable()
export class EmployeeRepository extends DefaultRepository<EmployeeModel> {
  constructor(dataSource: DataSource) {
    super(EmployeeModel, dataSource);
  }

  async persist(employee: Employee): Promise<void> {
    const model = this.create({
      id: employee.getEmployeeId(),
      name: employee.getName(),
      email: employee.getEmail(),
      createdAt: employee.getCreatedAt(),
      deletedAt: employee.getDeletedAt(),
    });
    await this.save(model);
  }

  async getById(id: string): Promise<Employee | null> {
    const model = await this.findOne({
      where: { id },
      withDeleted: true,
    });
    if (model) {
      return new Employee(
        model.id,
        model.name,
        model.email,
        model.createdAt,
        model.deletedAt,
      );
    }
    return null;
  }

  async existsByEmail(email: string): Promise<boolean> {
    const exists = await this.exists({
      where: { email },
      withDeleted: true,
    });
    return exists;
  }
}
