import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Technician } from "@/models/Technician";
import { verifyFirebaseToken } from "@/middleware/auth";

export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  const authResult = await verifyFirebaseToken(req);
  if (authResult instanceof NextResponse) return authResult;

  if (authResult.uid !== params.uid) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  await connectToDatabase();
  const technician = await Technician.findOne({ firebaseUid: params.uid });

  if (!technician) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(technician);
}