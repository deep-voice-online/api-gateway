import 'express';
import { UserRoles } from './user-roles.enum';

declare module 'express' {
  interface Request {
    user: {
      sub: string;
      role: UserRoles;
    };
  }
}
