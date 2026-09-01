import { model, Schema, Document } from 'mongoose';

export interface IEarnings extends Document {
  technicianId: string; // Reference to Technician._id
  jobId: string; // Reference to Job._id
  amount: number; // Amount earned before commission
  commissionDeducted: number; // Commission amount deducted
  payoutStatus: 'pending' | 'paid';
  payoutDate?: Date;
  createdAt: Date;
}

const EarningsSchema = new Schema<IEarnings>(
  {
    technicianId: { type: Schema.Types.ObjectId, ref: 'Technician', required: true },
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    amount: { type: Number, required: true, min: 0 },
    commissionDeducted: { type: Number, required: true, min: 0 },
    payoutStatus: {
      type: String,
      enum: ['pending', 'paid'],
      default: 'pending'
    },
    payoutDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes for common queries
EarningsSchema.index({ technicianId: 1 });
EarningsSchema.index({ jobId: 1 });
EarningsSchema.index({ payoutStatus: 1 });
EarningsSchema.index({ createdAt: 1 });

export const Earnings = model<IEarnings>('Earnings', EarningsSchema);