import { RefreshAccessTokenResponse } from '@deepvoicerut/contracts/gen/auth';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class RefreshAccessTokenResponseGql implements RefreshAccessTokenResponse {
  @Field()
  accessToken: string;
}
