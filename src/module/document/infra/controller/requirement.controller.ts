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
import { CreateRequirementInput } from './dto/requirement/create-requirement-input.dto';
import { CreateRequirementUseCase } from '@/module/document/application/use-case/requirement/create-requirement.use-case';
import { DeleteRequirementUseCase } from '@/module/document/application/use-case/requirement/delete-requirement.use-case';
import { ListRequirementEmployeeInput } from './dto/requirement/list-requirement-employee-input.dto';
import { ListRequirementEmployeeOutput } from './type/requirement/list-requirement-employee-output.type';
import { ListRequirementEmployeeUseCase } from '@/module/document/application/use-case/requirement/list-requirement-employee.use-case';

@Controller('requirement')
export class RequirementController {
  constructor(
    private readonly createRequirementUseCase: CreateRequirementUseCase,
    private readonly listRequirementEmployeeUseCase: ListRequirementEmployeeUseCase,
    private readonly deleteRequirementUseCase: DeleteRequirementUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: CreateRequirementInput): Promise<{ id: string }> {
    return await this.createRequirementUseCase.execute(input);
  }

  @Get('/employee/list')
  @HttpCode(HttpStatus.OK)
  async listRequirementEmployee(
    @Query() query: ListRequirementEmployeeInput,
  ): Promise<ListRequirementEmployeeOutput> {
    return await this.listRequirementEmployeeUseCase.execute(query);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id', UuidParamPipe) id: string): Promise<void> {
    await this.deleteRequirementUseCase.execute({ id });
  }
}
