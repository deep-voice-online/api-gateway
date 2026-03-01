import { Field, InputType } from '@nestjs/graphql';
import { UploadRequest } from '@deepvoicerut/contracts/gen/file';

@InputType()
export class UploadRequestGql implements UploadRequest {
  @Field()
  userId: string;

  @Field()
  fileName: string;

  @Field()
  contentType: string;

  @Field()
  fileSize: number;
}
