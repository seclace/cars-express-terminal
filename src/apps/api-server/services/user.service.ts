import UserRepo from '@api-server/repos/UserRepo';
import { IUser } from '@api-server/models/User';
import { RouteError } from '@api-server/other/classes';
import HttpStatusCodes from '@api-server/constants/HttpStatusCodes';


// **** Variables **** //

export const USER_NOT_FOUND_ERR = 'User not found';


// **** Functions **** //

export class UserService {
  /**
   * Get all users.
   */
  getAll(): Promise<IUser[]> {
    return UserRepo.getAll();
  }

  /**
   * Add one user.
   */
  addOne(user: IUser): Promise<void> {
    return UserRepo.add(user);
  }

  /**
   * Update one user.
   */
  async updateOne(user: IUser): Promise<void> {
    const persists = await UserRepo.persists(user.id);
    if (!persists) {
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        USER_NOT_FOUND_ERR,
      );
    }
    // Return user
    return UserRepo.update(user);
  }

  /**
   * Delete a user by their id.
   */
  async delete(id: number): Promise<void> {
    const persists = await UserRepo.persists(id);
    if (!persists) {
      throw new RouteError(
        HttpStatusCodes.NOT_FOUND,
        USER_NOT_FOUND_ERR,
      );
    }
    // Delete user
    return UserRepo.delete(id);
  }
}
