import { NextRequest, NextResponse } from 'next/server';
export async function POST(req: NextRequest) {
  try { const b = await req.json(); console.log('Enrollment:', b); return NextResponse.json({success:true}); }
  catch { return NextResponse.json({error:'Error'},{status:500}); }
}
