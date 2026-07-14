import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_PREFIXES } from '../constants/error-keys';

export class ColumnNotExistsException extends AppException {
    constructor() {
        super(HttpStatus.BAD_REQUEST, `${ERROR_PREFIXES.COMMON}.bad_request`);
    }
}
