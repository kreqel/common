import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_PREFIXES } from '../constants/error-keys';

export class ConflictException extends AppException {
    constructor(detail: string = `${ERROR_PREFIXES.COMMON}.conflict`) {
        super(HttpStatus.CONFLICT, detail);
    }
}
