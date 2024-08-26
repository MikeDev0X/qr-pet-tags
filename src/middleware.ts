import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from 'jose';

import { privateKey } from '../src/helpers/sampleENV';
const middleware = async (request: NextRequest) =>{
    
    const rawCookieValue : any = request.cookies.get('cookieValue')?.value;
    const loginUrl = new URL('/login', request.url);
    const pathname = request.nextUrl.pathname;

    if (!rawCookieValue) {
        return NextResponse.redirect(loginUrl); // Redirect to login if no token is found
    }

    const decodedCookieValue = decodeURIComponent(rawCookieValue);

    let cookieData;
    try {
        cookieData = JSON.parse(decodedCookieValue);
    } catch (err) {
        console.error('Failed to parse cookie JSON:', err);
        const loginUrl = new URL('/login', request.url);
        return NextResponse.redirect(loginUrl);
    }

    const token = cookieData.token;

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
   matcher: ['/admin'] 
}

export default middleware;