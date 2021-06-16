import { MigrationInterface, QueryRunner } from 'typeorm';

export class userCustomer1623883501113 implements MigrationInterface {
  name = 'userCustomer1623883501113';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "password" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "lastName" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name")`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "lastName"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "password"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username")`,
    );
  }
}
