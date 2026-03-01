import { Field, InputType } from '@nestjs/graphql';
import { RefreshRequest } from '@deepvoicerut/contracts/gen/auth';

@InputType()
export class RefreshRequestGql implements RefreshRequest {
  @Field()
  refreshToken: string;
}
