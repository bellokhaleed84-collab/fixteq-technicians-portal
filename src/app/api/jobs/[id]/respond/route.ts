import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { Technician } from "@/models/Technician";
import { verifyFirebaseToken } from "@/middleware/auth";
import { JOB_STATUS } from "@/lib/constants";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await verifyFirebaseToken(req);
  if (authResult instanceof NextResponse) return authResult;

  const body = await req.json();
  const accept: boolean = body.accept;

  await connectToDatabase();

  const technician = await Technician.findOne({ firebaseUid: authResult.uid });
  if (!technician) {
    return NextResponse.json({ error: "Technician profile not found" }, { status: 404 });
  }

  const job = await Job.findById(params.id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.status !== JOB_STATUS.NEW || job.technicianUid !== null) {
    return NextResponse.json({ error: "Job is no longer available" }, { status: 409 });
  }

  if (!technician.categories.includes(job.category)) {
    return NextResponse.json({ error: "Job category does not match your trade" }, { status: 403 });
  }

  if (accept) {
    job.technicianUid = authResult.uid;
    job.status = JOB_STATUS.ACCEPTED;
    await job.save();
  } else {
    if (!job.declinedBy.includes(authResult.uid)) {
      job.declinedBy.push(authResult.uid);
      await job.save();
    }
  }

  return NextResponse.json(job);
}