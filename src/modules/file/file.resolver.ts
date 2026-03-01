import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Request } from 'express';
import { FileService } from './file.service';
import {
  DownloadLinkResponseGql,
  FileInfoGql,
  FileListResponseGql,
  UploadResponseGql,
} from './dto/responses';
import {
  FileIdRequestGql,
  UploadRequestGql,
  UserFileRequestGql,
} from './dto/requests';

@Resolver()
export class FileResolver {
  constructor(private readonly fileService: FileService) {}

  //todo забирать userId из req
  @Mutation(() => UploadResponseGql)
  public fileInitializeUpload(
    @Context('req') req: Request,
    @Args('data') dto: UploadRequestGql,
  ) {
    // return this.fileService.initializeUpload({ ...dto, userId: req.user.sub });
    return this.fileService.initializeUpload(dto);
  }

  @Query(() => DownloadLinkResponseGql)
  public fileInetDownloadLink(@Args('data') dto: FileIdRequestGql) {
    return this.fileService.getDownloadLink(dto);
  }

  //todo забирать userId из req
  @Query(() => FileListResponseGql)
  public fileGetUserFiles(@Args('data') dto: UserFileRequestGql) {
    return this.fileService.getUserFiles(dto);
  }

  @Query(() => FileInfoGql)
  public fileGetFileInfo(@Args('data') dto: FileIdRequestGql) {
    return this.fileService.getFileInfo(dto);
  }
}
