/**
 * Express router paths go here.
 */

import { Immutable } from '@api-server/other/types';


const Paths = {
  Base: '/api',
  Auth: {
    Base: '/auth',
    Login: '/login',
    Logout: '/logout',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  Cars: {
    Base: '/cars',
    Get: '',
    Add: '',
    Update: '/:id',
    Delete: '/:id',
  },
};


// **** Export **** //

export type TPaths = Immutable<typeof Paths>;
export default Paths as TPaths;
