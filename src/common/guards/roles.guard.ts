import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';

import { Request } from 'express';
import { UserRoles } from '../types/user-roles.enum';
import { PUBLIC_KEY } from '../decorators/public-protected.decorator';

export interface GqlContext {
  req: Request;
}

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic: string = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const roles: UserRoles = this.reflector.getAllAndOverride('ROLES', [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('role decorator:', UserRoles[roles]);
    if (roles.length == 0) return true;

    const request =
      GqlExecutionContext.create(context).getContext<GqlContext>().req;

    console.log('user role:', request.user.role);

    if (!roles.includes(request.user.role)) {
      throw new ForbiddenException('Недостаточно прав');
    }

    return true;
  }
}
