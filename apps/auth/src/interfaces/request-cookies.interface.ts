import { Request } from 'express';

export interface RequestWithCookies extends Request {
  cookies: {
    Authentication?: string;
  };
  Authentication?: string;
}
