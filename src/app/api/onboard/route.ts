import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { take, template } = await request.json();

  console.log('take', take);
  console.log('template', template);

  return NextResponse.json({ message: 'Onboarding completed' });
}