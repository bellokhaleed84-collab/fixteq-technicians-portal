import mongoose, { model, models, Schema, Document, Types } from 'mongoose';

export interface IEarnings extends Document {
  technicianId: Types.ObjectId; // Reference to Technician._id
  jobId: Types.ObjectId; // Reference to Job._id
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
      default: 'pending',
    },
    payoutDate: { type: Date },
  },
  {
    timestamps: true,
  }
);

EarningsSchema.index({ technicianId: 1 });
EarningsSchema.index({ jobId: 1 });
EarningsSchema.index({ payoutStatus: 1 });
EarningsSchema.index({ createdAt: 1 });

export const Earnings: mongoose.Model<IEarnings> =
  models.Earnings || model<IEarnings>('Earnings', EarningsSchema);