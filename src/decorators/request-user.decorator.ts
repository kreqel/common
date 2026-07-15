import { FastifyRequest } from 'fastify';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RequestUserType } from '../types';

export const RequestUser = createParamDecorator((_, ctx: ExecutionContext): RequestUserType => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();

    return request.user as RequestUserType;
});
