import { FileInfo, FileList } from '@deepvoicerut/contracts/gen/file';
import { Field, ObjectType } from '@nestjs/graphql';
import { FileGql } from '../entety/file.entety';

@ObjectType()
export class FileListResponseGql implements FileList {
  @Field(() => [FileGql])
  files: FileGql[];
}

@ObjectType()
export class FileInfoGql implements FileInfo {
  @Field(() => FileGql)
  file: FileGql;
}
