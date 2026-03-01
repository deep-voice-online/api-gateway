import { Field, ObjectType } from '@nestjs/graphql';
import { JwtResponse } from '@deepvoicerut/contracts/gen/auth';

@ObjectType()
export class JwtResponseGql implements JwtResponse {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
