import { ConflictException, Injectable } from '@nestjs/common';
import { Employee } from '../../domain/employee';
import { EmployeeRepository } from '../../infra/repository/employee.repository';

@Injectable()
export class CreateEmployeeUseCase {
  constructor(private readonly employeeRepository: EmployeeRepository) {}

  async execute(input: input): Promise<output> {
    const existingEmployeeForEmail = await this.employeeRepository.getByEmail(
      input.email,
    );
    if (existingEmployeeForEmail) {
      throw new ConflictException('Colaborador já cadastrado.');
    }

    const employee = Employee.create(input.name, input.email);
    await this.employeeRepository.persist(employee);
    return {
      id: employee.getEmployeeId(),
    };
  }
}

type input = {
  name: string;
  email: string;
};

type output = {
  id: string;
};
