import { join } from 'path';

export const PROTO_PATH = 'node_modules/@kreqel/common/dist/proto';

interface Package {
    package: string;
    protoPath: string;
}

export const AUTH_PACKAGE: Package = {
    package: 'auth.v1',
    protoPath: join(PROTO_PATH, 'auth.proto'),
};
