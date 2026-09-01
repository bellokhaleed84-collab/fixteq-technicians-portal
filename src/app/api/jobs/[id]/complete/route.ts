import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import { Job } from "@/models/Job";
import { verifyFirebaseToken } from "@/middleware/auth";
import { JOB_STATUS } from "@/lib/constants";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const authResult = await verifyFirebaseToken(req);
  if (authResult instanceof NextResponse) return authResult;

  await connectToDatabase();

  const job = await Job.findById(params.id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }

  if (job.technicianUid !== authResult.uid || job.status !== JOB_STATUS.ACCEPTED) {
    return NextResponse.json({ error: "Job cannot be completed" }, { status: 409 });
  }

  job.status = JOB_STATUS.COMPLETED;
  job.completedAt = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  await job.save();

  return NextResponse.json(job);
}