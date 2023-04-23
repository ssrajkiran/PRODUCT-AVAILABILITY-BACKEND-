declare const generateToken: (user: any, refreshToken?: boolean) => Promise<{
    access_token: string;
    refresh_token: string;
} | {
    access_token: string;
    refresh_token?: undefined;
}>;
export default generateToken;
