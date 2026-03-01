import { FileInfo, FileList } from '@deepvoicerut/contracts/gen/file';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileInfoGql implements FileInfo {
  @Field(() => String)
  id: string;

  @Field(() => String)
  userId: string;

  @Field(() => String)
  originalName: string;

  @Field(() => String)
  fileKey: string;

  @Field(() => String)
  contentType: string;

  @Field(() => Number) // Для чисел в GraphQL лучше уточнять (Int или Float)
  size: number;

  @Field(() => String, { description: 'UPLOADING, READY, DELETED' })
  status: string;

  @Field(() => String, { description: 'ISO дата создания' })
  createdAt: string;
}

@ObjectType()
export class FileListResponseGql implements FileList {
  @Field(() => [FileInfoGql])
  files: FileInfo[];
}
