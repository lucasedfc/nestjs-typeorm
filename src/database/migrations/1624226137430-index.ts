import {MigrationInterface, QueryRunner} from "typeorm";

export class index1624226137430 implements MigrationInterface {
    name = 'index1624226137430'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE INDEX "IDX_0decfc62b4e4834e2024a9d9c4" ON "product" ("price", "stock") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_0decfc62b4e4834e2024a9d9c4"`);
    }

}
