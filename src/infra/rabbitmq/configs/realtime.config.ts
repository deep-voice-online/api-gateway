import { ConfigService } from '@nestjs/config';
import { RmqOptions, Transport } from '@nestjs/microservices';

export function getRealtimeConfig(config: ConfigService): RmqOptions {
  return {
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow<string>('RABBITMQ_URL')],
      queue: 'realtime_queue',
      queueOptions: {
        durable: true,
      },
    },
  };
}
