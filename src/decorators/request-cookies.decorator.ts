import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const RequestCookies = createParamDecorator((property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    const cookies = request.cookies as Record<string, string> | undefined;

    if (!cookies) {
        return property ? undefined : {};
    }

    return property ? cookies[property] : cookies;
});
