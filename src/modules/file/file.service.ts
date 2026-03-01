import {
  DownloadLinkResponse,
  FileIdRequest,
  FileInfo,
  FileList,
  FileServiceClient,
  UploadRequest,
  UploadResponse,
  UserFileRequest,
} from '@deepvoicerut/contracts/gen/file';
import { Inject, Injectable } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class FileService {
  private fileClient: FileServiceClient;

  constructor(@Inject('FILE_CLIENT') private readonly client: ClientGrpc) {
    this.fileClient = client.getService<FileServiceClient>('FileService');
  }

  public async initializeUpload(dto: UploadRequest): Promise<UploadResponse> {
    return firstValueFrom(this.fileClient.initializeUpload(dto));
  }

  public async getDownloadLink(
    dto: FileIdRequest,
  ): Promise<DownloadLinkResponse> {
    return firstValueFrom(this.fileClient.getDownloadLink(dto));
  }

  public async getUserFiles(dto: UserFileRequest): Promise<FileList> {
    return firstValueFrom(this.fileClient.getUserFiles(dto));
  }

  public async getFileInfo(dto: FileIdRequest): Promise<FileInfo> {
    return firstValueFrom(this.fileClient.getFileInfo(dto));
  }
}
