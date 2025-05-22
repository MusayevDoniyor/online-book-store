import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Users } from 'src/auth/entities/user.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const requiredRoles = this.reflector.get<string[]>(
      'roles',
      ctx.getHandler(),
    );

    if (!requiredRoles) return true;

    const user: Users = ctx.getContext().req.user;

    return requiredRoles.includes(user.role);
  }
}
