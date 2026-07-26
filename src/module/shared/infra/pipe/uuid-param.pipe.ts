import { BadRequestException, ParseUUIDPipe } from '@nestjs/common';

export const UuidParamPipe = new ParseUUIDPipe({
  exceptionFactory: () =>
    new BadRequestException('O código informado deve ser um UUID válido.'),
});
