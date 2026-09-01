import { NextRequest, NextResponse } from 'next/server';
import { adminAuth } from '@/lib/firebase/adminApp';

export async function verifyFirebaseToken(req: NextRequest) {
  const idToken = req.headers.get('authorization')?.split('Bearer ')[1];

  if (!idToken) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decodedToken = await adminAuth.verifyIdToken(idToken);
    return { uid: decodedToken.uid };
  } catch (error) {
    console.error('Error verifying Firebase token:', error);
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

// Wrapper function for API routes
export function withAuth(handler: (req: NextRequest, auth: { uid: string }) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const authResult = await verifyFirebaseToken(req);

    if (authResult instanceof NextResponse) {
      return authResult; // Return error response
    }

    return handler(req, authResult as { uid: string });
  };
}