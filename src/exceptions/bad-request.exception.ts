import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_PREFIXES } from '../constants/error-keys';

export class BadRequestException extends AppException {
    constructor(detail: string = `${ERROR_PREFIXES.COMMON}.bad_request`) {
        super(HttpStatus.BAD_REQUEST, detail);
    }
}
