import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from './users/models/user.schema';

const getCurrentUserByContent = (context: ExecutionContext) => {
  const request: Request & { user: UserDocument } = context
    .switchToHttp()
    .getRequest();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContent(context),
);
