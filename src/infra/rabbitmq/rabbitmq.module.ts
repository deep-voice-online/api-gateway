import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { getAuthConfig } from './configs/auth.config';
import { AuthClient } from './clients/auth.client';

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
    ]),
  ],
  providers: [AuthClient],
  exports: [AuthClient],
})
export class RabbitmqModule {}
