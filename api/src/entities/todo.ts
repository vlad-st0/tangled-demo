import { Entity, Property, ManyToOne } from '@mikro-orm/core';
import { User } from './user';
import { AbstractBase } from './_base';

@Entity()
export class Todo extends AbstractBase {
  @Property()
  title!: string;

  @Property({ type: 'text' })
  note?: string;

  @ManyToOne({ onDelete: 'cascade' })
  user!: User;

  @Property()
  completed = false;

  @Property()
  priority = false;
}
