import { TranscribeProcessResponse } from '@deepvoicerut/contracts/gen/transcribe';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TranscribeProcessResponseGql implements TranscribeProcessResponse {
  @Field()
  success: boolean;
}
