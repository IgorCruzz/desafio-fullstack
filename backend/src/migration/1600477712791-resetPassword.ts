import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class resetPassword1600477712791 implements MigrationInterface {
  private reset = new Table({
    name: 'resets',
    columns: [
      {
        name: 'user_id',
        type: 'integer',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'reset_token',
        type: 'varchar',
        isNullable: true,
      },
      {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.reset)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.reset)
  }
}
