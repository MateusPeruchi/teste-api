import { BadRequestException } from '@nestjs/common';

export class Name {
  private value: string;

  constructor(name: string) {
    if (!name) {
      throw new BadRequestException('Nome inválido.');
    }
    this.value = name;
  }

  getValue() {
    return this.value;
  }
}
