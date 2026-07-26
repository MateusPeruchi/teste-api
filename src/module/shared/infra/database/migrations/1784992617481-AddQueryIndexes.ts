import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddQueryIndexes1784992617481 implements MigrationInterface {
  name = 'AddQueryIndexes1784992617481';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "ix_document_active"
        ON "document" ("requirement_id", "version" DESC)
        INCLUDE ("id", "url_storage", "created_at")
        WHERE "deleted_at" IS NULL`,
    );

    await queryRunner.query(
      `ALTER TABLE "requirement"
        DROP CONSTRAINT "UQ_507c5e7911633b4055e9a24345c"`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "ux_requirement_employee_type_active"
        ON "requirement" ("employee_id", "document_type_id")
        WHERE "deleted_at" IS NULL`,
    );

    await queryRunner.query(
      `CREATE INDEX "ix_requirement_type_active"
        ON "requirement" ("document_type_id", "id")
        WHERE "deleted_at" IS NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "ix_requirement_type_active"`);
    await queryRunner.query(`DROP INDEX "ux_requirement_employee_type_active"`);
    await queryRunner.query(
      `ALTER TABLE "requirement"
        ADD CONSTRAINT "UQ_507c5e7911633b4055e9a24345c"
        UNIQUE ("employee_id", "document_type_id")`,
    );
    await queryRunner.query(`DROP INDEX "ix_document_active"`);
  }
}
