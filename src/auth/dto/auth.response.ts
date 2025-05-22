import { ObjectType, Field } from '@nestjs/graphql';
import { Users } from '../entities/user.entity';

@ObjectType()
export class AuthResponse {
  @Field(() => String)
  message: string;

  @Field(() => String)
  token?: string;

  @Field(() => Users)
  user: Users;
}
