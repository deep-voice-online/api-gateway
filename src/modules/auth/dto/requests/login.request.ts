import { Field, InputType } from '@nestjs/graphql';
import { LoginRequest } from '@deepvoicerut/contracts/gen/auth';

@InputType()
export class LoginRequestGql implements LoginRequest {
  @Field()
  email: string;

  @Field()
  password: string;
}
