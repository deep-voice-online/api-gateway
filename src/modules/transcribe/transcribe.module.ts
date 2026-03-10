import { Module } from '@nestjs/common';
import { TranscribeService } from './transcribe.service';
import { TranscribeResolver } from './transcribe.resolver';

@Module({
  providers: [TranscribeResolver, TranscribeService],
})
export class TranscribeModule {}
