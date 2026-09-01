import mongoose, { model, models, Schema, Document, Types } from 'mongoose';

export interface ISupportTicket extends Document {
  technicianId: Types.ObjectId; // Reference to Technician._id
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const SupportTicketSchema = new Schema<ISupportTicket>(
  {
    technicianId: { type: Schema.Types.ObjectId, ref: 'Technician', required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ['open', 'in_progress', 'resolved', 'closed'],
      default: 'open',
    },
  },
  {
    timestamps: true,
  }
);

SupportTicketSchema.index({ technicianId: 1 });
SupportTicketSchema.index({ status: 1 });
SupportTicketSchema.index({ createdAt: 1 });

export const SupportTicket: mongoose.Model<ISupportTicket> =
  models.SupportTicket || model<ISupportTicket>('SupportTicket', SupportTicketSchema);