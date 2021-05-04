import { Migration } from '@mikro-orm/migrations';

export class Migration20210504015356 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" drop column "updated_at";');
  }

}
