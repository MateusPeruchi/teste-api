import { Injectable } from '@nestjs/common';

export abstract class StorageS3 {
  abstract upload(key: string, file: string): Promise<void>;
}

@Injectable()
export class StorageFake implements StorageS3 {
  private readonly files = new Map<string, string>();

  async upload(key: string, file: string): Promise<void> {
    this.files.set(key, file);
    await Promise.resolve();
  }
}
