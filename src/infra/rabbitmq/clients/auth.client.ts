import { BaseClient } from './base.client';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class AuthClient extends BaseClient {
  constructor(@Inject('AUTH_CLIENT') client: ClientProxy) {
    super(client, 'AUTH_CLIENT');
  }
}
