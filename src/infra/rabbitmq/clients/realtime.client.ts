import { BaseClient } from './base.client';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

export class RealtimeClient extends BaseClient {
  constructor(@Inject('REALTIME_CLIENT') client: ClientProxy) {
    super(client, 'REALTIME_CLIENT');
  }
}
