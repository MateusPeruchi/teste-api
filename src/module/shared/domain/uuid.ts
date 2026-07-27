import { BadRequestException } from '@nestjs/common';

export class UUID {
  private static readonly PATTERN =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  private value: string;

  constructor(uuid: string) {
    if (!uuid || !UUID.PATTERN.test(uuid))
      throw new BadRequestException('UUID inválido.');
    this.value = uuid;
  }

  static create() {
    return new UUID(crypto.randomUUID());
  }

  getValue() {
    return this.value;
  }
}
