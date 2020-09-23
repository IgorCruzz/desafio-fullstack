import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class authentication1600466385318 implements MigrationInterface {
  private Authentication = new Table({
    name: 'authentications',
    columns: [
      {
        name: 'user_id',
        type: 'integer',
        isPrimary: true,
        isNullable: false,
      },
      {
        name: 'token',
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
    foreignKeys: [
      {
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    ],
  })

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.Authentication)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.Authentication)
  }
}
