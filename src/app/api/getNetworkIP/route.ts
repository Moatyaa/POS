import { NextResponse } from 'next/server';
import os from 'os';

export async function GET() {
    const interfaces = os.networkInterfaces();
    const networkIP: string[] = [];

    for (const name in interfaces) {
        for (const iface of interfaces[name] || []) {
            if (iface.family === 'IPv4' && !iface.internal) {
                networkIP.push(iface.address);
            }
        }
    }

    return NextResponse.json({ networkIP });
}
