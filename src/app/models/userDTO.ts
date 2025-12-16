export type UserDTO = {
    email: string;
    password: string;
    idUser?: string;
    name: string;
    role: string;
    access_token?: string 
    account_google?: boolean
}