import { Injectable } from '@nestjs/common';
import { TranscribeClient } from '../../infra/rabbitmq/clients/transcribe.client';
import { TranscribeProcessRequest } from '@deepvoicerut/contracts/gen/transcribe';

@Injectable()
export class TranscribeService {
  constructor(private readonly transcribeClient: TranscribeClient) {}

  public transcribeProcess(dto: TranscribeProcessRequest) {
    this.transcribeClient.transcribeProcess(dto);
  }
}
