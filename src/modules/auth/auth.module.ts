import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ClientsModule, GrpcOptions, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'AUTH_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService): GrpcOptions => ({
          transport: Transport.GRPC,
          options: {
            package: 'auth.v1',
            protoPath:
              './node_modules/@deepvoicerut/contracts/proto/auth.proto',
            url: config.getOrThrow<string>('AUTH_GRPC', 'localhost:50051'),
          },
        }),
      },
    ]),
  ],
  providers: [AuthService, AuthResolver],
})
export class AuthModule {}
