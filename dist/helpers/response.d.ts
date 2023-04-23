export type responseDto = {
    message: string;
    data?: Object | null;
    code: number;
    status?: boolean;
    error?: string | null;
    env?: string | null | undefined;
    count?: number;
};
declare const response: (message: string, data: Object | null | undefined, code: number, status?: boolean, error?: string, env?: string | null | undefined) => Promise<responseDto>;
export default response;
