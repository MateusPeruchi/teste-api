import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { DefaultPaginatedInput } from '../../../../shared/infra/controller/dto/default-paginated-input.dto';

export class ListEmployeeInput extends DefaultPaginatedInput {
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto.' })
  name?: string;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
  })
  @IsBoolean({ message: 'O campo includeDeleted deve ser true ou false.' })
  includeDeleted: boolean = false;
}
