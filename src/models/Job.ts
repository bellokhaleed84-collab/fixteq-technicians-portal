import mongoose, { model, models, Schema, Document } from "mongoose";
import { JOB_STATUS, JobStatusValue } from "@/lib/constants";

export interface IJob extends Document {
  technicianUid: string | null; // null = unclaimed, sitting in the pool
  category: string; // must match one of a technician's `categories`
  clientName: string;
  clientPhone: string;
  address: string;
  scheduledFor: string;
  price: number;
  description: string;
  status: JobStatusValue;
  declinedBy: string[]; // uids that declined — hidden from them going forward
  completedAt?: string;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new Schema<IJob>(
  {
    technicianUid: { type: String, default: null, index: true },
    category: { type: String, required: true, index: true },
    clientName: { type: String, required: true },
    clientPhone: { type: String, required: true },
    address: { type: String, required: true },
    scheduledFor: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    description: { type: String, required: true },
    status: {
      type: String,
      required: true,
      enum: Object.values(JOB_STATUS),
      default: JOB_STATUS.NEW,
    },
    declinedBy: { type: [String], default: [] },
    completedAt: { type: String },
  },
  { timestamps: true }
);

JobSchema.index({ status: 1, category: 1 });
JobSchema.index({ technicianUid: 1, status: 1 });

export const Job: mongoose.Model<IJob> = models.Job || model<IJob>("Job", JobSchema);