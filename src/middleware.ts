import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import { privateKey } from '../src/helpers/sampleENV';
const middleware = async (request: NextRequest) =>{
    
    const token = request.cookies.get('authToken')?.value;
    const loginUrl = new URL('/login', request.url);
    const pathname = request.nextUrl.pathname;

    if (!token) {
        return NextResponse.redirect(loginUrl); // Redirect to login if no token is found
    }

    if(pathname !== '/login'){
        try {
            const secret = new TextEncoder().encode(privateKey);

            const { payload } = await jwtVerify(token, secret);

            return NextResponse.next();

        } catch (err) {
            console.error('Token verification failed:', err);
            return NextResponse.redirect(loginUrl); // Redirect to login if token is invalid
        }
    }

    return NextResponse.next();

}

export const config = {
   matcher: ['/register'] 
}

export default middleware;