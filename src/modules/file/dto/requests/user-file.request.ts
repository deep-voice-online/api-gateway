import { UserFileRequest } from '@deepvoicerut/contracts/gen/file';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserFileRequestGql implements UserFileRequest {
  @Field()
  userId: string;
}
