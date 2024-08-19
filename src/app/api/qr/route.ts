import { NextResponse, NextRequest } from 'next/server';
import { GetDBSettings, database } from '../../../helpers/common';
import crypto from 'crypto';
import { SignJWT } from 'jose';
import { nanoid } from 'nanoid';
import { privateKey } from '../../../helpers/sampleENV';
import mysql, { RowDataPacket } from 'mysql2/promise'

const connectionParams = GetDBSettings();

export type qr = {
    quantity : number,
    endpointType : string, 
    existingQR : string
}

const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

function generateString(length : number) {

    let result = ' ';
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

export async function POST(request: NextRequest) {

    let connection = await mysql.createConnection(connectionParams);

    try {
        let response: NextResponse = NextResponse.json({ message: '' });

        const data = await request.json();

        const { quantity, endpointType, existingQR } : qr = await request.json();

        if (!quantity || !endpointType || !existingQR) {
            return NextResponse.redirect(new URL('/login', request.url));
        }
        else{

            const query = `INSERT INTO ${database}.qr (idQr, isActive, planType)
                           VALUES (?, ?, ?)`;


            // create from scratch case
            if(endpointType === 'fromScratch'){

                
                const query2 = `SELECT COUNT(*) as count FROM ${database}.qr WHERE idQr = ?`;

                let currentQr = '';
                let limit : number = 0;

                while (limit <  quantity){
                    //generate string
                    currentQr = generateString(8);

                    const [exists] = await connection.execute(query2, [currentQr]);
                    const count = (exists as any)[0].count;

                    if(count > 0)
                        continue;
                    else{
                        //qr not in db yet, proceed

                        const [insertSingle] = await connection.execute(query, [currentQr, false, 'unlimited']);
                        
                        if (insertSingle)
                            limit ++;
                    }

                }

                response = NextResponse.json({ message: `${limit+1}` });

            }
            // add existing QR code
            else if(endpointType === 'addExisting'){

                const [insertSingle] = await connection.execute(query, [existingQR, false, 'unlimited']);

                if (insertSingle)
                    response = NextResponse.json({ message: `1` });
            }

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