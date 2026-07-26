import { IsDate } from 'class-validator';
import { Type } from 'class-transformer';
import { DefaultPaginatedInput } from '../../../../../shared/infra/controller/dto/default-paginated-input.dto';

export class ListDocumentSubmissionLatestInput extends DefaultPaginatedInput {
  @Type(() => Date)
  @IsDate({ message: 'A data inicial deve ser uma data válida.' })
  startDate: Date = new Date();

  @Type(() => Date)
  @IsDate({ message: 'A data final deve ser uma data válida.' })
  endDate: Date = new Date();
}
