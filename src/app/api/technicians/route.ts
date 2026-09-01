import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Technician } from "@/models/Technician";
import { verifyFirebaseToken } from "@/middleware/auth";

export async function POST(req: NextRequest) {
  const authResult = await verifyFirebaseToken(req);
  if (authResult instanceof NextResponse) return authResult;

  const body = await req.json();
  await connectToDatabase();

  const existing = await Technician.findOne({ firebaseUid: authResult.uid });
  if (existing) {
    return NextResponse.json({ error: "Profile already exists" }, { status: 409 });
  }

  try {
    const technician = await Technician.create({
      firebaseUid: authResult.uid,
      name: body.name,
      email: body.email,
      phone: body.phone,
      categories: body.categories,
      yearsExperience: body.yearsExperience,
      baseArea: body.baseArea,
      idDocumentUrl: body.idDocumentUrl,
      portfolioUrls: body.portfolioUrls,
    });
    return NextResponse.json(technician, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}