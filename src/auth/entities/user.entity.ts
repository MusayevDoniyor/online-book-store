import {
  ObjectType,
  Field,
  HideField,
  registerEnumType,
} from '@nestjs/graphql';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';
import * as bcrypt from 'bcrypt';

export enum UserRoles {
  ADMIN = 'admin',
  USER = 'user',
}

registerEnumType(UserRoles, {
  name: 'UserRoles',
  description: 'Available roles for users',
});

@ObjectType()
@Entity()
export class Users {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { description: 'User ID' })
  id: string;

  @Column({ nullable: false })
  @Field(() => String, { description: 'User name' })
  name: string;

  @Column({ nullable: false, unique: true })
  @Field(() => String, {
    description: 'User email',
  })
  email: string;

  @Column({ nullable: false })
  @HideField()
  password: string;

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  @Field(() => String, {
    description: 'User role',
    defaultValue: UserRoles.USER,
  })
  role: UserRoles;

  @CreateDateColumn()
  @Field(() => Date, {
    description: 'User registered time',
  })
  created_at: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
    return this.password;
  }
}
