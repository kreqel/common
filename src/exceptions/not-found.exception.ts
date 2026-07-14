import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_PREFIXES } from '../constants/error-keys';

export class NotFoundException extends AppException {
    constructor(detail: string = `${ERROR_PREFIXES.COMMON}.not_found`) {
        super(HttpStatus.NOT_FOUND, detail);
    }
}
