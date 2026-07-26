import { Injectable } from '@nestjs/common';

@Injectable()
export class StorageGateway {
  private readonly files = new Map<string, string>();

  async upload(key: string, file: string): Promise<void> {
    this.files.set(key, file);
    await Promise.resolve();
  }
}
