import type { AxiosError } from "axios"

interface ApiErrorResponse {
    msg: string;
}

export const catchError = (error: unknown): string => {
    const errorAxios = error as AxiosError<ApiErrorResponse>;

    const errorMesage = errorAxios.response?.data.msg || 'An unexpected error occurred';
    return errorMesage;
}