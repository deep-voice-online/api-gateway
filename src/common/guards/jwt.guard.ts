import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from '../decorators/public-protected.decorator';

interface GqlContext {
  req: Request;
}

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {

  constructor(private reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext<GqlContext>().req;
  }

  // canActivate(context: ExecutionContext) {
  //   const isPublic = this.reflector.getAllAndOverride<boolean>(PUBLIC_KEY, [
  //     context.getHandler(),
  //     context.getClass(),
  //   ]);
  //
  //   if (isPublic) return true; // Пропускаем проверку JWT
  //
  //   return super.canActivate(context);
  // }
}
