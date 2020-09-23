import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class users1600295641295 implements MigrationInterface {
  private Users = new Table({
    name: 'users',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment',
        isNullable: false,
      },
      {
        name: 'name',
        type: 'varchar(20)',
        isNullable: false,
      },
      {
        name: 'lastname',
        type: 'varchar(50)',
        isNullable: false,
      },
      {
        name: 'email',
        type: 'varchar(150)',
        isNullable: false,
        isUnique: true,
      },
      {
        name: 'cellphone',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'password_hash',
        type: 'varchar',
        isNullable: false,
      },
      {
        name: 'activation',
        type: 'boolean',
        default: false,
        isNullable: false,
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
    await queryRunner.createTable(this.Users)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.Users)
  }
}
