import { Field, InputType } from '@nestjs/graphql';
import { RefreshAccessTokenRequest } from '@deepvoicerut/contracts/gen/auth';

@InputType()
export class RefreshAccessTokenRequestGql implements RefreshAccessTokenRequest {
  @Field()
  refreshToken: string;
}
