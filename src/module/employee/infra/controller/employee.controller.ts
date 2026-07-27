import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { UuidParamPipe } from '@/module/shared/infra/pipe/uuid-param.pipe';
import { CreateEmployeeInput } from './dto/create-employee-input.dto';
import { CreateEmployeeUseCase } from '@/module/employee/application/use-case/create-employee.use-case';
import { GetEmployeeOutput } from './type/get-employee-output.type';
import { GetEmployeeUseCase } from '@/module/employee/application/use-case/get-employee.use-case';
import { DeleteEmployeeUseCase } from '@/module/employee/application/use-case/delete-employee.use-case';
import { ListEmployeeOutput } from './type/list-employee-output.type';
import { ListEmployeeInput } from './dto/list-employee-input.dto';
import { ListEmployeeUseCase } from '@/module/employee/application/use-case/list-employee.use-case';

@Controller('employee')
export class EmployeeController {
  constructor(
    private readonly createEmployeeUseCase: CreateEmployeeUseCase,
    private readonly listEmployeeUseCase: ListEmployeeUseCase,
    private readonly getEmployeeUseCase: GetEmployeeUseCase,
    private readonly deleteEmployeeUseCase: DeleteEmployeeUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: CreateEmployeeInput): Promise<{ id: string }> {
    return await this.createEmployeeUseCase.execute(input);
  }

  @Get('/list')
  @HttpCode(HttpStatus.OK)
  async listEmployee(
    @Query() query: ListEmployeeInput,
  ): Promise<ListEmployeeOutput> {
    return await this.listEmployeeUseCase.execute(query);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async get(
    @Param('id', UuidParamPipe) id: string,
  ): Promise<GetEmployeeOutput> {
    return await this.getEmployeeUseCase.execute({ id });
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', UuidParamPipe) id: string): Promise<void> {
    await this.deleteEmployeeUseCase.execute({ id });
  }
}
