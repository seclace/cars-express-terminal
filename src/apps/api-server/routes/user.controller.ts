import HttpStatusCodes from '@api-server/constants/HttpStatusCodes';

import { UserService } from '@src/apps/api-server/services/user.service';
import { IUser } from '@api-server/models/User';
import { IReq, IRes } from './types/express/misc';


// **** UserController **** //

export class UserController {
  constructor(private readonly userService: UserService) {
    // this.getAll = this.getAll.bind(this);
    // this.add = this.add.bind(this);
  }

  /**
   * Get all users.
   */
  async getAll(_: IReq, res: IRes) {
    const users = await this.userService.getAll();
    return res.status(HttpStatusCodes.OK).json({ users });
  }

  /**
   * Add one user.
   */
  async add(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await this.userService.addOne(user);
    return res.status(HttpStatusCodes.CREATED).end();
  }

  /**
   * Update one user.
   */
  async update(req: IReq<{user: IUser}>, res: IRes) {
    const { user } = req.body;
    await this.userService.updateOne(user);
    return res.status(HttpStatusCodes.OK).end();
  }

  /**
   * Delete one user.
   */
  async delete(req: IReq, res: IRes) {
    const id = +req.params.id;
    await this.userService.delete(id);
    return res.status(HttpStatusCodes.OK).end();
  }
}
