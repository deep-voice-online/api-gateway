import { Field, ObjectType } from '@nestjs/graphql';
import { SuccessResponse } from '@deepvoicerut/contracts/gen/auth';

@ObjectType()
export class SuccessResponseGql implements SuccessResponse {
  @Field()
  ok: boolean;
}
