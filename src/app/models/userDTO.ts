export type UserDTO = {
    email: string;
    password: string;
    idUser?: string;
    name: string;
    role: string;
    sended?: boolean;
    access_token?: string;
    account_google?: boolean
}
