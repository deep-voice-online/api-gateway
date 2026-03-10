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
} from './dto/requests';
import { RolesProtected } from '../../common/decorators';
import { UserRoles } from '../../common/types/user-roles.enum';

@RolesProtected(UserRoles.USER)
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
    return this.fileService.initializeUpload({ ...dto, userId: req.user.sub });
  }

  @Query(() => DownloadLinkResponseGql)
  public fileInetDownloadLink(@Args('data') dto: FileIdRequestGql) {
    return this.fileService.getDownloadLink(dto);
  }

  //todo забирать userId из req
  @Query(() => FileListResponseGql)
  public fileGetUserFiles(@Context('req') req: Request) {
    return this.fileService.getUserFiles({ userId: req.user.sub });
  }

  @Query(() => FileInfoGql)
  public fileGetFileInfo(@Args('data') dto: FileIdRequestGql) {
    return this.fileService.getFileInfo(dto);
  }
}
