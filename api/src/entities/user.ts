import { Entity, Enum, Property, OneToMany, Collection } from '@mikro-orm/core';
import { Todo } from './todo';
import { AbstractBase } from './_base';

@Entity()
export class User extends AbstractBase {
  @Property()
  email!: string;

  @Property()
  username!: string;

  @Property({ hidden: true })
  password!: string;

  @Enum(() => UserRole)
  role = UserRole.USER;

  @OneToMany(() => Todo, (x) => x.user, { orphanRemoval: true })
  todos = new Collection<Todo>(this);
}

export enum UserRole {
  SUPER_ADMIN = 'super-admin',
  ADMIN = 'admin',
  USER = 'user',
}
