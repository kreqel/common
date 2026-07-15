export type RequestUserType = {
    sub: string;
    type: string;
    email?: string;
};

export type RequestCookiesType = Record<string, string> | undefined;
