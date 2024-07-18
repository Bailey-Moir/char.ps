import {NextResponse} from "next/server";

export async function POST(req: Request) {
    // Authorization
    //try {
    //    if (req.headers.get('authorization').split(' ')[1] != getEnv('ZENDESK_WEBHOOK_TOKEN')) {
    //        console.log('Error 401: incorrect bearer token.');
    //        return NextResponse.json(null, {status: 401});
    //    }
    //} catch {
    //    console.log('Error 401: authorization header formatted incorrectly or missing.');
    //    return NextResponse.json(null, {status: 400});
    //}

    // Parse body JSON
    console.log(req);
    return new NextResponse(req.body);
    try {
        req.body
    } catch {
        return NextResponse.json({error: 'Request JSON parse failed'}, {status: 400});
    }
}
