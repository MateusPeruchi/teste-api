import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDocumentTypeInput {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: string;
}
