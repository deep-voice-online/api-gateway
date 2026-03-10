import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { TranscribeService } from './transcribe.service';
import { TranscribeServiceController } from '@deepvoicerut/contracts/gen/transcribe';
import { TranscribeProcessResponseGql } from './dto/responses';
import { TranscribeProcessRequestGql } from './dto/requests';
import { RolesProtected } from '../../common/decorators';
import { UserRoles } from '../../common/types/user-roles.enum';
import { Request } from 'express';

@RolesProtected(UserRoles.USER)
@Resolver()
export class TranscribeResolver {
  constructor(private readonly transcribeService: TranscribeService) {}

  @Mutation(() => TranscribeProcessResponseGql)
  transcribeProcess(
    @Context('req') req: Request,
    @Args('data') dto: TranscribeProcessRequestGql,
  ) {
    this.transcribeService.transcribeProcess({ ...dto, userId: req.user.sub });
    return { success: true };
  }
}
