import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  AuthServiceClient,
  ConfirmRegisterRequest,
  RegisterRequest,
  LoginRequest,
  RefreshRequest,
  JwtResponse,
  SuccessResponse,
} from '@deepvoicerut/contracts/gen/auth';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  private authClient: AuthServiceClient;

  constructor(@Inject('AUTH_CLIENT') private readonly client: ClientGrpc) {
    this.authClient = client.getService<AuthServiceClient>('AuthService');
  }

  public async register(dto: RegisterRequest): Promise<SuccessResponse> {
    return firstValueFrom(this.authClient.register(dto));
  }

  public async registerConfirm(
    dto: ConfirmRegisterRequest,
  ): Promise<JwtResponse> {
    return firstValueFrom(this.authClient.confirmRegister(dto));
  }

  public async login(dto: LoginRequest): Promise<JwtResponse> {
    return firstValueFrom(this.authClient.login(dto));
  }

  public async refresh(dto: RefreshRequest): Promise<JwtResponse> {
    return firstValueFrom(this.authClient.refresh(dto));
  }

  public async logout(): Promise<SuccessResponse> {
    return firstValueFrom(this.authClient.logout({}));
  }
}
