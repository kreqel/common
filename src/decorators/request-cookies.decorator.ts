import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { RequestCookiesType } from '../types';

export const RequestCookies = createParamDecorator(
    (property: string, ctx: ExecutionContext): RequestCookiesType | string => {
        const request = ctx.switchToHttp().getRequest<FastifyRequest>();
        const cookies = request.cookies as RequestCookiesType;

        if (!cookies) {
            return property ? undefined : {};
        }

        return property ? cookies[property] : cookies;
    },
);
