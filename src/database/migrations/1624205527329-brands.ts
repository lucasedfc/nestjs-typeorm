import {MigrationInterface, QueryRunner} from "typeorm";

export class brands1624205527329 implements MigrationInterface {
    name = 'brands1624205527329'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "description"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "image" character varying(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "brand" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "brand" ADD "description" text`);
    }

}
