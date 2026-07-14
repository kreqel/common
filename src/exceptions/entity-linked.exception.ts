import { HttpStatus } from '@nestjs/common';
import { AppException } from './app.exception';
import { ERROR_PREFIXES } from '../constants/error-keys';

export class EntityLinkedException extends AppException {
    constructor() {
        super(HttpStatus.CONFLICT, `${ERROR_PREFIXES.COMMON}.conflict`);
    }
}
