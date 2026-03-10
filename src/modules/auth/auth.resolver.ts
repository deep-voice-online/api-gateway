import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import {
  JwtResponseGql,
  RefreshAccessTokenResponseGql,
  SuccessResponseGql,
} from './dto/responses';
import {
  ConfirmRegisterRequestGql,
  LoginRequestGql,
  RegisterRequestGql,
} from './dto/requests';
import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { isDev } from '../../common/utils/is-dev.util';
import { Public } from '../../common/decorators/public-protected.decorator';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Query(() => String)
  public ping() {
    return 'pong';
  }

  @Mutation(() => SuccessResponseGql)
  public async authRegister(@Args('data') dto: RegisterRequestGql) {
    return this.authService.register(dto);
  }

  @Mutation(() => JwtResponseGql)
  public async authConfirmRegister(
    @Context('res') res: Response,
    @Args('data') dto: ConfirmRegisterRequestGql,
  ) {
    const response = await this.authService.registerConfirm(dto);
    this.setCookie(res, response.refreshToken);
    return response;
  }

  @Mutation(() => JwtResponseGql)
  public async authLogin(
    @Context('res') res: Response,
    @Args('data') dto: LoginRequestGql,
  ) {
    const response = await this.authService.login(dto);
    this.setCookie(res, response.refreshToken);
    return response;
  }

  @Mutation(() => RefreshAccessTokenResponseGql)
  public async authRefreshAccessToken(@Context('req') req: Request) {
    return await this.authService.refreshAccessToken({
      refreshToken: req.cookies['refreshToken'] as string,
    });
  }

  @Mutation(() => SuccessResponseGql)
  public authLogout(@Context('res') res: Response) {
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

  @Query(() => String)
  public getTokens(@Context('req') req: Request) {
    return `accessToken ${JSON.stringify(req.user)}\nrefreshToken: ${req.cookies['refreshToken'] as string}`;
  }
}
