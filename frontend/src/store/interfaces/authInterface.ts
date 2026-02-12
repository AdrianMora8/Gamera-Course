export type Status = "checking" | "authenticated" | "unauthenticated";

export interface User {
    id: string;
    completeName: string;
    email: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface UserRegister {
    name: string;
    lastName: string;
    email: string;
}

export interface registerCredentials
{
    name: string;
    lastName: string;
    email: string;
    password: string;
}