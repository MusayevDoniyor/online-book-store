import { InputType, Field } from '@nestjs/graphql';
import { UserRoles } from '../entities/user.entity';
import { IsEmail, IsStrongPassword } from 'class-validator';

@InputType()
export class RegisterInput {
  @Field(() => String, { description: 'User name' })
  name: string;

  @Field(() => String, { description: 'User email' })
  @IsEmail()
  email: string;

  @Field(() => String, { description: 'User password' })
  @IsStrongPassword()
  password: string;

  @Field(() => UserRoles, {
    description: 'User roles',
    defaultValue: UserRoles.USER,
  })
  role: UserRoles;
}
