import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../models';
import { UserDto } from '../dto';

const getCurrentUserByContent = (context: ExecutionContext): unknown => {
  const request = context.switchToHttp().getRequest<
    Request & {
      user?: UserDocument | UserDto;
    }
  >();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContent(context),
);
