import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileResolver } from './file.resolver';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'FILE_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: 'file.v1',
            protoPath: './node_modules/@deepvoicerut/contracts/proto/file.proto',
            url: config.getOrThrow<string>('FILE_GRPC', 'localhost:50051'),
          },
        }),
      },
    ]),
  ],
  providers: [FileResolver, FileService],
})
export class FileModule {}
