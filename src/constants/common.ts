import { join } from 'path';

export const PROTO_PATH = 'node_modules/@kreqel/common/dist/proto';

interface Package {
    package: string;
    protoPath: string;
    token: string;
}

export const AUTH_PACKAGE: Package = {
    package: 'auth.v1',
    token: 'AUTH_PACKAGE',
    protoPath: join(PROTO_PATH, 'auth.proto'),
};
