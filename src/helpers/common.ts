export interface IDBSettings {
    host: string

    port: number

    user: string

    password: string

    database: string
}

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