export interface IDBSettings {
    host: string

    port: number

    user: string

    password: string

    database: string
}

export const database = 'petqr';

export const GetDBSettings = (): IDBSettings => {
    //const env = process.env.NODE_ENV

        return {
            host: process.env.host!,

            port: parseInt(process.env.port!),

            user: process.env.user!,

            password: process.env.password!,

            database: process.env.database!,
        }
}

export default function getCookieValue(name: string): string | null {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);

    if (parts.length === 2) return parts.pop()?.split(';').shift() || null;
    return null;
}