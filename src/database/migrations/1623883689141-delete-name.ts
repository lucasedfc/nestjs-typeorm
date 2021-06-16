import {MigrationInterface, QueryRunner} from "typeorm";

export class deleteName1623883689141 implements MigrationInterface {
    name = 'deleteName1623883689141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "name" character varying(100) NOT NULL`);
    }

}
