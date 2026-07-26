import { MigrationInterface, QueryRunner } from 'typeorm';

export class RenameDocumentStorageKey1785088007216 implements MigrationInterface {
  name = 'RenameDocumentStorageKey1785088007216';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document" RENAME COLUMN "url_storage" TO "storage_key"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "document" RENAME COLUMN "storage_key" TO "url_storage"`,
    );
  }
}
