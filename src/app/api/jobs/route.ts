import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { Technician } from "@/models/Technician";
import { verifyFirebaseToken } from "@/middleware/auth";
import { JOB_STATUS } from "@/lib/constants";

export async function GET(req: NextRequest) {
  const authResult = await verifyFirebaseToken(req);
  if (authResult instanceof NextResponse) return authResult;

  await connectToDatabase();

  const technician = await Technician.findOne({ firebaseUid: authResult.uid });
  if (!technician) {
    return NextResponse.json({ error: "Technician profile not found" }, { status: 404 });
  }

  // A technician sees: jobs already theirs (any status), plus unclaimed
  // "new" jobs in their categories that they haven't already declined.
  const jobs = await Job.find({
    $or: [
      { technicianUid: authResult.uid },
      {
        technicianUid: null,
        status: JOB_STATUS.NEW,
        category: { $in: technician.categories },
        declinedBy: { $ne: authResult.uid },
      },
    ],
  }).sort({ createdAt: -1 });

  return NextResponse.json(jobs);
}