import { Catch, ExceptionFilter, HttpStatus, NotFoundException } from '@nestjs/common';
import { ERROR_PREFIXES } from '../constants/error-keys';
import {
    ConflictException,
    AppException,
    EntityLinkedException,
    ColumnNotExistsException,
} from '../exceptions';

@Catch()
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: unknown) {
        // PrismaClientKnownRequestError
        if (
            exception &&
            typeof exception === 'object' &&
            'code' in exception &&
            typeof exception.code === 'string'
        ) {
            const code = exception.code;
            switch (code) {
                case 'P2002':
                    throw new ConflictException();
                case 'P2003':
                    throw new EntityLinkedException();
                case 'P2022':
                    throw new ColumnNotExistsException();
                case 'P2025':
                    throw new NotFoundException();
                default:
                    throw new AppException(
                        HttpStatus.INTERNAL_SERVER_ERROR,
                        `${ERROR_PREFIXES.COMMON}.server_error`,
                    );
            }
        }

        // PrismaClientValidationError
        if (
            exception instanceof Error &&
            exception.constructor.name === 'PrismaClientValidationError'
        ) {
            throw new AppException(HttpStatus.BAD_REQUEST, `${ERROR_PREFIXES.COMMON}.bad_request`);
        }

        if (
            exception instanceof Error &&
            exception.constructor.name === 'PrismaClientUnknownRequestError'
        ) {
            throw new AppException(
                HttpStatus.INTERNAL_SERVER_ERROR,
                `${ERROR_PREFIXES.COMMON}.server_error`,
            );
        }

        throw exception;
    }
}
