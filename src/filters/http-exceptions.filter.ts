import { ERROR_PREFIXES } from '../constants/error-keys';
import { ErrorResponseDto } from '../dtos/error.response.dto';
import { Catch, ExceptionFilter, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { FastifyReply } from 'fastify';

interface NestErrorResponse {
    message?: string | string[];
    error?: string;
    statusCode?: number;
}

interface AppErrorResponse {
    detail?: string;
}

type CombinedResponse = NestErrorResponse & AppErrorResponse;

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter<HttpException> {
    constructor(private readonly loggerService: Logger) {}
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const reply = ctx.getResponse<FastifyReply>();
        const status = exception.getStatus();

        const responseBody = exception.getResponse();

        let detail: string | undefined;

        if (typeof responseBody === 'object' && responseBody !== null) {
            const body = responseBody as CombinedResponse;

            const rawDetail = body.detail ?? body.message;

            if (Array.isArray(rawDetail)) {
                detail = rawDetail[0];
            } else {
                detail = rawDetail;
            }
        } else if (typeof responseBody === 'string') {
            detail = responseBody;
        }

        if (detail && !detail.includes('.')) {
            detail = `${ERROR_PREFIXES.COMMON}.${detail}`;
        }

        this.loggerService.error(
            {
                message: exception.message,
                detail: detail,
            },
            HttpException.name,
        );

        reply.status(status).send(
            ErrorResponseDto.from({
                message: this.mapStatus(status),
                detail: detail,
            }),
        );
    }

    private mapStatus(code: number): string {
        const statusMap: Record<number, string> = {
            [HttpStatus.BAD_REQUEST]: `bad_request`,
            [HttpStatus.UNAUTHORIZED]: `unauthorized`,
            [HttpStatus.FORBIDDEN]: `forbidden`,
            [HttpStatus.CONFLICT]: `conflict`,
            [HttpStatus.NOT_FOUND]: `not_found`,
            [HttpStatus.INTERNAL_SERVER_ERROR]: `server_error`,
        };
        return statusMap[code] || `unknown`;
    }
}
