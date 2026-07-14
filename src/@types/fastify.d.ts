// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FastifyRequest from 'fastify';

declare module 'fastify' {
    export interface FastifyRequest {
        cookies?: Record<string, string>;
        user?: AuthUserPayload;
        refreshToken?: string;
    }
}
