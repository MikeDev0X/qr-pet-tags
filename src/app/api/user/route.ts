import { NextResponse, NextRequest } from 'next/server'
import mysql, { RowDataPacket } from 'mysql2/promise'
import { GetDBSettings, IDBSettings, database } from '../../../helpers/common';
import crypto from 'crypto';

let connectionParams = GetDBSettings()

export async function GET(request: Request) {
    try {

        const connection = await mysql.createConnection(connectionParams)

        const query = `SELECT fullName FROM ${database}.user_ WHERE email=?`;
        const query2 = `SELECT passW FROM user_ WHERE email=?`

        let values: (string | null)[] = [];

        const { searchParams } = new URL(request.url);
        const user: string | null = searchParams.get('email');
        const paramPass: string | null = searchParams.get('password');
        values.push(user);


        const [results] = await connection.execute(query, values);

        if(Array.isArray(results) && results.length > 0){


            const [password] = await connection.execute(query2, values);
            const hashInputPw = crypto.createHash('sha256').update(`${paramPass !== null ? paramPass : ''}`).digest('hex');

            //validation logic
            //SHA256 password encrypted comparison

            const row = password as RowDataPacket;
            const retrievedPassword = row[0].passW;

            if(hashInputPw === retrievedPassword)
                console.log('Kiti');



        }

        connection.end()
        return NextResponse.json(results)

    } catch (err) {
        console.log('ERROR: API - ', (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus: 200,
        }

        return NextResponse.json(response, { status: 200 })
    }
}