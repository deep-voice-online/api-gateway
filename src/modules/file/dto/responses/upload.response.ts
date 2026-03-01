import { UploadResponse } from '@deepvoicerut/contracts/gen/file';
import { Field, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UploadResponseGql implements UploadResponse {
  @Field()
  fileId: string;

  @Field()
  uploadUrl: string;

  @Field()
  fileKey: string;
}
