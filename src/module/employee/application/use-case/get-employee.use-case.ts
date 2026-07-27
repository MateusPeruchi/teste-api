import { Injectable, NotFoundException } from '@nestjs/common';
import { EmployeeRepository } from '@/module/employee/infra/repository/employee.repository';

@Injectable()
export class GetEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: input): Promise<output> {
    const employee = await this.employeeRepository.getById(input.id);
    if (!employee) throw new NotFoundException('Colaborador não encontrado.');
    return {
      id: employee.getEmployeeId(),
      name: employee.getName(),
      email: employee.getEmail(),
      createdAt: employee.getCreatedAt(),
      deletedAt: employee.getDeletedAt(),
    };
  }
}

type input = {
  id: string;
};

type output = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  deletedAt: Date | null;
};
