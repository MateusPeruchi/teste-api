import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRequirementDocumentIndexes1785152196343 implements MigrationInterface {
  name = 'AddRequirementDocumentIndexes1785152196343';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "idx_requirement_employee_id"
        ON "requirement" ("employee_id")`,
    );

    await queryRunner.query(
      `CREATE INDEX "idx_requirement_deleted_at"
        ON "requirement" ("deleted_at")
        WHERE "deleted_at" IS NULL`,
    );

    await queryRunner.query(
      `CREATE INDEX "idx_document_requirement_id_active"
        ON "document" ("requirement_id")
        WHERE "deleted_at" IS NULL`,
    );

    await queryRunner.query(
      `CREATE INDEX "idx_document_created_at"
        ON "document" ("created_at")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP INDEX "idx_document_created_at"`);
    await queryRunner.query(`DROP INDEX "idx_document_requirement_id_active"`);
    await queryRunner.query(`DROP INDEX "idx_requirement_deleted_at"`);
    await queryRunner.query(`DROP INDEX "idx_requirement_employee_id"`);
  }
}
