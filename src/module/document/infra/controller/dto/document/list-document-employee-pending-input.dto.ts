import { IsNotEmpty, IsUUID } from 'class-validator';
import { DefaultPaginatedInput } from '../../../../../shared/infra/controller/dto/default-paginated-input.dto';

export class ListDocumentEmployeePendingInput extends DefaultPaginatedInput {
  @IsUUID('all', {
    message: 'O código do colaborador deve ser um UUID válido.',
  })
  @IsNotEmpty({ message: 'O código do colaborador é obrigatório.' })
  employeeId!: string;
}
