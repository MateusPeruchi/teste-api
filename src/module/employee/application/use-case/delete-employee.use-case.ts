import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '@/module/employee/infra/repository/employee.repository';

@Injectable()
export class DeleteEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: input): Promise<void> {
    const employee = await this.employeeRepository.getById(input.id);
    if (!employee) {
      throw new NotFoundException('Colaborador não encontrado.');
    }
    if (!employee.getIsDeleted()) {
      employee.delete();
      await this.employeeRepository.persist(employee);
    }
  }
}

type input = {
  id: string;
};
