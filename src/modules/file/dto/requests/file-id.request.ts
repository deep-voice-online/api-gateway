import { FileIdRequest } from '@deepvoicerut/contracts/gen/file';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FileIdRequestGql implements FileIdRequest {
  @Field()
  fileId: string;
}
