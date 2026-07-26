import { BadRequestException } from '@nestjs/common';

export class Email {
  private static readonly PATTERN =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  private value: string;

  constructor(email: string) {
    if (!email || !Email.PATTERN.test(email)) {
      throw new BadRequestException('E-mail inválido.');
    }
    this.value = email;
  }

  getValue() {
    return this.value;
  }
}
