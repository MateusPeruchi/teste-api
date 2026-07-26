import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateRequirementInput {
  @IsUUID('all', {
    message: 'O código do colaborador deve ser um UUID válido.',
  })
  @IsNotEmpty({ message: 'O código do colaborador é obrigatório.' })
  employeeId!: string;

  @IsUUID('all', {
    message: 'O código do tipo de documento deve ser um UUID válido.',
  })
  @IsNotEmpty({ message: 'O código do tipo de documento é obrigatório.' })
  documentTypeId!: string;
}
