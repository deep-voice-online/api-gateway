import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export function getAuthConfig(config: ConfigService): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow<string>('RABBITMQ_URL')],
      queue: 'auth_queue',
      queueOptions: {
        durable: true,
      },
    },
  };
}
