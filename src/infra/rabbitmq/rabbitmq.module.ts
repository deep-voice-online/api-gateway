import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAuthConfig } from './configs/auth.config';
import { AuthClient } from './clients/auth.client';
import { getTranscribeConfig } from './configs/transcribe.config';
import { TranscribeClient } from './clients/transcribe.client';
import {getRealtimeConfig} from "./configs/realtime.config";
import { RealtimeClient } from './clients/realtime.client';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getAuthConfig,
      },
      {
        name: 'TRANSCRIBE_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getTranscribeConfig,
      },
      {
        name: 'REALTIME_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: getRealtimeConfig,
      },
    ]),
  ],
  providers: [AuthClient, TranscribeClient, RealtimeClient],
  exports: [AuthClient, TranscribeClient, RealtimeClient],
})
export class RabbitmqModule {}
