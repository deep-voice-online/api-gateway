import { ConfigService } from '@nestjs/config';

export function isDev(config: ConfigService) {
  return config.get<boolean>('IS_DEV', false);
}
