import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { JwtGuard, RolesGuard } from '../guards';
import { UserRoles } from '../types/user-roles.enum';

export const RolesProtected = (...roles: UserRoles[]) =>
  applyDecorators(UseGuards(JwtGuard, RolesGuard), SetMetadata('ROLES', roles));
