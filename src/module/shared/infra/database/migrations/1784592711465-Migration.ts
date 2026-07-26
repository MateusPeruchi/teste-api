import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1784592711465 implements MigrationInterface {
  name = 'Migration1784592711465';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "document"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "url_storage" character varying NOT NULL,
        "version" integer NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "requirement_id" uuid NOT NULL,
        CONSTRAINT "UQ_714c6313701b4608e8a52451959" UNIQUE ("requirement_id", "version"),
        CONSTRAINT "PK_e57d3357f83f3cdc0acffc3d777" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "requirement"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "employee_id" uuid NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        "document_type_id" uuid NOT NULL,
        CONSTRAINT "UQ_507c5e7911633b4055e9a24345c" UNIQUE ("employee_id", "document_type_id"),
        CONSTRAINT "PK_4da9c4e837771e341099466a53d" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "document_type"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_d63f0a80a96310fe1e9657795ff" UNIQUE ("name"),
        CONSTRAINT "PK_2e1aa55eac1947ddf3221506edb" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `CREATE TABLE "employee"
      (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "name" character varying NOT NULL,
        "email" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        "deleted_at" TIMESTAMP,
        CONSTRAINT "UQ_817d1d427138772d47eca048855" UNIQUE ("email"),
        CONSTRAINT "PK_3c2bc72f03fd5abbbc5ac169498" PRIMARY KEY ("id")
      )`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" ADD CONSTRAINT "FK_a7fe28c5461642617e177b2387e"
        FOREIGN KEY ("requirement_id")
        REFERENCES "requirement"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requirement" ADD CONSTRAINT "FK_1eb26559e60273404e4ab567652"
        FOREIGN KEY ("document_type_id")
        REFERENCES "document_type"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "requirement" ADD CONSTRAINT "fk_requirement_employee"
        FOREIGN KEY ("employee_id")
        REFERENCES "employee"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "requirement" DROP CONSTRAINT "fk_requirement_employee"`,
    );
    await queryRunner.query(
      `ALTER TABLE "requirement" DROP CONSTRAINT "FK_1eb26559e60273404e4ab567652"`,
    );
    await queryRunner.query(
      `ALTER TABLE "document" DROP CONSTRAINT "FK_a7fe28c5461642617e177b2387e"`,
    );
    await queryRunner.query(`DROP TABLE "employee"`);
    await queryRunner.query(`DROP TABLE "document_type"`);
    await queryRunner.query(`DROP TABLE "requirement"`);
    await queryRunner.query(`DROP TABLE "document"`);
  }
}
