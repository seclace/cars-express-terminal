import * as e from 'express';

import { ISessionUser } from '@src/apps/api-server/models/User';


// **** Express **** //

export interface IReq<T = void> extends e.Request {
  body: T;
}

export interface IRes extends e.Response {
  locals: {
    sessionUser?: ISessionUser;
  };
}
