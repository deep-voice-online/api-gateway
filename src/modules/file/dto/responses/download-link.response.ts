import { DownloadLinkResponse } from '@deepvoicerut/contracts/gen/file';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DownloadLinkResponseGql implements DownloadLinkResponse {
  @Field()
  downloadUrl: string;

  @Field()
  expiresIn: number;
}
