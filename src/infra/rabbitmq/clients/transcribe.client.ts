import { BaseClient } from './base.client';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { TranscribeProcessRequest } from '@deepvoicerut/contracts/gen/transcribe';

export class TranscribeClient extends BaseClient {
  constructor(@Inject('TRANSCRIBE_CLIENT') client: ClientProxy) {
    super(client, 'TRANSCRIBE_CLIENT');
  }

  public transcribeProcess(dto: TranscribeProcessRequest) {
    this.emitEvent('transcribe.process', dto);
  }
}
