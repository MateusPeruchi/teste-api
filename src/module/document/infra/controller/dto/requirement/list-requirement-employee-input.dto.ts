import { IsBoolean, IsNotEmpty, IsUUID } from 'class-validator';
import { DefaultPaginatedInput } from '../../../../../shared/infra/controller/dto/default-paginated-input.dto';
import { Transform } from 'class-transformer';

export class ListRequirementEmployeeInput extends DefaultPaginatedInput {
  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
  })
  @IsBoolean({ message: 'O campo includeDeleted deve ser true ou false.' })
  includeDeleted: boolean = false;

  @IsUUID('all', {
    message: 'O código do colaborador deve ser um UUID válido.',
  })
  @IsNotEmpty({ message: 'O código do colaborador é obrigatório.' })
  employeeId!: string;
}
