import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { JwtResponseGql, SuccessResponseGql } from './dto/responses';
import {
  ConfirmRegisterRequestGql,
  LoginRequestGql,
  RegisterRequestGql,
} from './dto/requests';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { isDev } from '../../common/utils/is-dev.util';
import { RolesProtected } from '../../common/decorators';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @RolesProtected()
  @Query(() => String)
  public ping() {
    return 'pong';
  }

  @Mutation(() => SuccessResponseGql)
  public async register(@Args('data') dto: RegisterRequestGql) {
    return this.authService.register(dto);
  }

  @Mutation(() => JwtResponseGql)
  public async confirmRegister(
    @Context('res') res: Response,
    @Args('data') dto: ConfirmRegisterRequestGql,
  ) {
    const response = await this.authService.registerConfirm(dto);
    this.setCookie(res, response.refreshToken);
    return response;
  }

  @Mutation(() => JwtResponseGql)
  public async login(
    @Context('res') res: Response,
    @Args('data') dto: LoginRequestGql,
  ) {
    const response = await this.authService.login(dto);
    this.setCookie(res, response.refreshToken);
    return response;
  }

  @Mutation(() => JwtResponseGql)
  public async refresh(
    @Context('res') res: Response,
    @Context('req') req: Request,
  ) {
    const response = await this.authService.refresh({
      refreshToken: req.user.refreshTokenId,
    });
    this.setCookie(res, response.refreshToken);
    return response;
  }

  @Mutation(() => SuccessResponseGql)
  public logout(@Context('res') res: Response) {
    res.clearCookie('refreshToken');
    return { ok: true };
  }

  private setCookie(res: Response, key: string) {
    res.cookie('refreshToken', key, {
      httpOnly: true,
      secure: !isDev(this.configService),
      sameSite: 'lax',
    });
  }
}
