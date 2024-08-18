import { NextResponse, NextRequest } from 'next/server';
import { GetDBSettings, database } from '../../../helpers/common';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { privateKey } from '../../../helpers/sampleENV';
import mysql, { RowDataPacket } from 'mysql2/promise'

const connectionParams = GetDBSettings();

export async function GET(request: NextRequest) {
    let connection;
    try {
        
        connection = await mysql.createConnection(connectionParams);
        const query = `SELECT fullName FROM ${database}.user_ WHERE email=?`;
        const query2 = `SELECT passW FROM user_ WHERE email=?`;

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
                    .setExpirationTime('1 minute') // Token expires in 1 minute
                    .sign(secret);

                const cookieOptions = {
                    path: '/',
                    maxAge: 60,
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
    
    //return NextResponse.redirect(new URL('/register', request.url));
}