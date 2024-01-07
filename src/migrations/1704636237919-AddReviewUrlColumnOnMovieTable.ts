import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddReviewUrlColumnOnMovieTable1704636237919
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'movie',
      new TableColumn({
        name: 'review_url',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('movie', 'review_url');
  }
}
