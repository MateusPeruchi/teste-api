import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDocumentInput {
  @IsUUID('all', { message: 'O código da exigência deve ser um UUID válido.' })
  @IsNotEmpty({ message: 'O código da exigência é obrigatório.' })
  requirementId!: string;

  @IsString({ message: 'O arquivo deve ser um texto.' })
  @IsNotEmpty({ message: 'O arquivo é obrigatório.' })
  file!: string;
}
