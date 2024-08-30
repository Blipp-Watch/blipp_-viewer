import { getReferrals, getReferrer, saveReferral } from "@/app/lib/storage";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const { userId, referrerId } = await request.json();

    if(!userId || !referrerId) {
        return NextResponse.json({ error: "Missing userId or refferrerId" }, { status: 400 });
    }
    saveReferral(userId, referrerId);
    return NextResponse.json({ success: true });
}

export async function GET(request: NextRequest) {
    const userId = request.nextUrl.searchParams.get("userId");
    if(!userId) {
        return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }
    const refferals = getReferrals(userId);
    const refferer = getReferrer(userId);
    return NextResponse.json({ refferals, refferer });
}