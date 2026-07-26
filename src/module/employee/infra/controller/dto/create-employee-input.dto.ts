import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateEmployeeInput {
  @IsString({ message: 'O nome deve ser um texto.' })
  @IsNotEmpty({ message: 'O nome é obrigatório.' })
  name!: string;

  @IsString({ message: 'O e-mail deve ser um texto.' })
  @IsNotEmpty({ message: 'O e-mail é obrigatório.' })
  @IsEmail({}, { message: 'O e-mail informado é inválido.' })
  email!: string;
}
