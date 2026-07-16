export const PROTO_PATH = 'node_modules/@kreqel/common/dist/proto';

interface Package {
    package: string;
    protoPath: string;
}

export const AUTH_PACKAGE: Package = {
    package: 'auth.v1',
    protoPath: require.resolve('@kreqel/common/dist/proto/auth.proto'),
};
