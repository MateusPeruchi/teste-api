import { IsOptional, IsString } from 'class-validator';
import { DefaultPaginatedInput } from '../../../../../shared/infra/controller/dto/default-paginated-input.dto';

export class ListDocumentTypeInput extends DefaultPaginatedInput {
  @IsOptional()
  @IsString({ message: 'O nome deve ser um texto.' })
  name?: string;
}
