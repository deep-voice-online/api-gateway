import { File } from '@deepvoicerut/contracts/gen/file';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class FileGql implements File {
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

  @Field(() => Date, { description: 'ISO дата создания' })
  createdAt: Date;
}
