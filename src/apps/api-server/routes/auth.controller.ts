import HttpStatusCodes from '@src/apps/api-server/constants/HttpStatusCodes';
import SessionUtil from '@src/apps/api-server/util/SessionUtil';
import AuthService from '@src/apps/api-server/services/auth.service';

import { IReq, IRes } from './types/express/misc';


// **** Types **** //

interface ILoginReq {
  email: string;
  password: string;
}


// **** AuthController **** //

export class AuthController {
  /**
   * Login a user.
   */
  async login(req: IReq<ILoginReq>, res: IRes) {
    const { email, password } = req.body;
    // Login
    const user = await AuthService.login(email, password);
    // Setup Admin Cookie
    await SessionUtil.addSessionData(res, {
      id: user.id,
      email: user.name,
      name: user.name,
      role: user.role,
    });
    // Return
    return res.status(HttpStatusCodes.OK).end();
  }

  /**
   * Logout the user.
   */
  logout(_: IReq, res: IRes) {
    SessionUtil.clearCookie(res);
    return res.status(HttpStatusCodes.OK).end();
  }
}
