import { Field, InputType } from '@nestjs/graphql';
import { ConfirmRegisterRequest } from '@deepvoicerut/contracts/gen/auth';

@InputType()
export class ConfirmRegisterRequestGql implements ConfirmRegisterRequest {
  @Field()
  email: string;

  @Field()
  otp: number;
}
