import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

export const RequestHeaders = createParamDecorator((property: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<FastifyRequest>();
    const headers = request.headers;

    if (!headers) {
        return property ? undefined : {};
    }

    return property ? headers[property.toLowerCase()] : headers;
});
