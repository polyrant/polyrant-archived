import { Migration } from '@mikro-orm/migrations';

export class Migration20210504025409 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "user" drop constraint if exists "user_name_check";');
    this.addSql('alter table "user" alter column "name" type text using ("name"::text);');
    this.addSql('alter table "user" alter column "name" set default \'\';');
    this.addSql('alter table "user" drop constraint if exists "user_bio_check";');
    this.addSql('alter table "user" alter column "bio" type text using ("bio"::text);');
    this.addSql('alter table "user" alter column "bio" set default \'\';');
  }

}
