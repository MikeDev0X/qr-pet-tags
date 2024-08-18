import { NextResponse, NextRequest } from 'next/server';
import { GetDBSettings, database } from '../../../helpers/common';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { privateKey } from '../../../helpers/sampleENV';
import mysql, { RowDataPacket } from 'mysql2/promise'

const connectionParams = GetDBSettings();

type userData = {
    email: string;
    userType: string;
    fullName: string;
    passW: string;
}

export async function GET(request: NextRequest) {
    let connection ;
    try {
        
        connection = await mysql.createConnection(connectionParams);
        const query : string = `SELECT fullName FROM ${database}.user_ WHERE email=?`;
        const query2 : string = `SELECT passW FROM user_ WHERE email=?`;

        const { searchParams } = new URL(request.url);
        const user: string | null = searchParams.get('email');
        const paramPass: string | null = searchParams.get('password');
        let response: NextResponse = NextResponse.json({ message: '' });

        if (!user || !paramPass) {
            // Redirect to login if email or password is missing
            return NextResponse.redirect(new URL('/login', request.url));
        }

        const [results] = await connection.execute(query, [user]);

        if (Array.isArray(results) && results.length > 0) {
            const [passwordResult] = await connection.execute(query2, [user]);
            const hashInputPw = crypto.createHash('sha256').update(paramPass).digest('hex');

            const passwordRow = passwordResult as RowDataPacket;
            const retrievedPassword = passwordRow[0]?.passW;

            if (hashInputPw === retrievedPassword) {
                const payload = {
                    userEmail: user,
                };

                const secret = new TextEncoder().encode(privateKey);

                const token = await new SignJWT(payload)
                    .setProtectedHeader({ alg: 'HS256' })
                    .setJti(nanoid())
                    .setIssuedAt()
                    .setExpirationTime('1 day') // Token expires in 1 minute
                    .sign(secret);

                const cookieOptions = {
                    path: '/',
                    maxAge: 60 * 60 * 24,
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict' as 'strict' | 'lax' | 'none',
                };
                
                response = NextResponse.json({ message: `Token set successfully` });
                response.cookies.set('authToken',token, cookieOptions);
                return response;
            }
            else{
                
                response = NextResponse.json({ message: `Incorrect credentials` });
                return response;
            }
        }

        
        response = NextResponse.json({ message: `Incorrect credentials` });
        return response;

    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);

        return NextResponse.json({
            error: (err as Error).message,
            returnedStatus: 500,
        }, { status: 500 });
    } finally {
        if (connection) {
            connection.end();
        }
    }
}


export async function POST(request: NextRequest) {

    let connection;
    const data : userData = await request.json();

    const { email, userType, fullName, passW} : userData = data;

    if (!email || !userType || !fullName || !passW) {
        return NextResponse.json({ error: 'name, email, and password are required in the request body.' });
    }


    try {

        connection = await mysql.createConnection(connectionParams);
        let response: NextResponse = NextResponse.json({ message: '' });

        // check if the user already exists
        const checkQuery = `SELECT COUNT(*) as count FROM ${database}.user_ WHERE email = ?`;
        const [checkResult] = await connection.execute(checkQuery, [email]);
        const count = (checkResult as any)[0].count;

        if (count > 0) {
            // User already exists
            response = NextResponse.json({ message: 'User already exists' }, { status: 409 });
            return response;
        }
        else{

            const query: string = `INSERT INTO ${database}.user_ (email, userType, fullName, passW)
                           VALUES (?, ?, ?, ?)`;
            const [results] = await connection.execute(query, [email, userType, fullName, passW]);

            if(results)
                response = NextResponse.json({ message: `User added successfully` });
        }

        return response;

    } catch (err) {
        console.error('ERROR: API - ', (err as Error).message);

        return NextResponse.json({
            error: (err as Error).message,
            returnedStatus: 500,
        }, { status: 500 });

    } finally {
        if (connection) {
            connection.end();
        }
    }

}