import { IsDate, IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';
import { DefaultPaginatedInput } from '@/module/shared/infra/controller/dto/default-paginated-input.dto';

export class ListDocumentSubmissionLatestInput extends DefaultPaginatedInput {
  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'A data inicial deve ser uma data válida.' })
  startDate?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate({ message: 'A data final deve ser uma data válida.' })
  endDate?: Date;

  @IsOptional()
  @IsUUID('all', {
    message: 'O código do colaborador deve ser um UUID válido.',
  })
  employeeId?: string;
}
