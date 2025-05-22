import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Users } from './entities/user.entity';
import { RegisterInput } from './dto/register.input';
import { LoginInput } from './dto/login.input';
import { AuthResponse } from './dto/auth.response';
import { CurrentUser } from 'src/common/decorator/current-user.decorator';
import { GqlAuthGuard } from 'src/common/guards/gql-auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Users)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponse)
  registerUser(@Args('registerInput') registerInput: RegisterInput) {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthResponse)
  loginUser(@Args('loginInput') loginInput: LoginInput) {
    return this.authService.login(loginInput);
  }

  @Query(() => Users, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  getProfile(@CurrentUser() user: Users) {
    return this.authService.findOne(user.id);
  }
}
