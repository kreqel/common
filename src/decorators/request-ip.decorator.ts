import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

/** Достаёт IP клиента из запроса. */
export const RequestIp = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): string | null => {
        const request = ctx.switchToHttp().getRequest<FastifyRequest>();

        const xForwardedFor = request.headers['x-forwarded-for'];
        if (typeof xForwardedFor === 'string' && xForwardedFor.length > 0) {
            return xForwardedFor.split(',')[0]?.trim() || null;
        }

        return request.ip ?? null;
    },
);
