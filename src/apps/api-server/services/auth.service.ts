import UserRepo from '@api-server/repos/UserRepo';

import PwdUtil from '@src/apps/api-server/util/PwdUtil';
import { tick } from '@src/apps/api-server/util/misc';

import HttpStatusCodes from '@src/apps/api-server/constants/HttpStatusCodes';
import { RouteError } from '@api-server/other/classes';
import { IUser } from '@api-server/models/User';


// **** Variables **** //

// Errors
export const Errors = {
  Unauth: 'Unauthorized',
  EmailNotFound(email: string) {
    return `User with email "${email}" not found`;
  },
} as const;


// **** Functions **** //

/**
 * Login a user.
 */
async function login(email: string, password: string): Promise<IUser> {
  // Fetch user
  const user = await UserRepo.getOne(email);
  if (!user) {
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED,
      Errors.EmailNotFound(email),
    );
  }
  // Check password
  const hash = (user.pwdHash ?? ''),
    pwdPassed = await PwdUtil.compare(password, hash);
  if (!pwdPassed) {
    // If password failed, wait 500ms this will increase security
    await tick(500);
    throw new RouteError(
      HttpStatusCodes.UNAUTHORIZED, 
      Errors.Unauth,
    );
  }
  // Return
  return user;
}


// **** Export default **** //

export default {
  login,
} as const;
