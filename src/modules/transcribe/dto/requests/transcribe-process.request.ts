import { TranscribeProcessRequest } from '@deepvoicerut/contracts/gen/transcribe';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TranscribeProcessRequestGql implements Omit<TranscribeProcessRequest, 'userId'> {
  @Field()
  downloadUrl: string;
}
