// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FastifyRequest from 'fastify';
import { RequestCookiesType, RequestUserType } from '.';

declare module 'fastify' {
    export interface FastifyRequest {
        cookies?: RequestCookiesType;
        user?: RequestUserType;
        refreshToken?: string;
    }
}
