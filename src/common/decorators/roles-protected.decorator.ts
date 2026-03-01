import { applyDecorators, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../guards';

export const RolesProtected = () => applyDecorators(UseGuards(JwtGuard));
