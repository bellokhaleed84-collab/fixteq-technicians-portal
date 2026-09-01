require("dotenv").config({ path: ".env.local" });
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema(
  {
    technicianUid: { type: String, default: null },
    category: { type: String, required: true },
    clientName: String,
    clientPhone: String,
    address: String,
    scheduledFor: String,
    price: Number,
    description: String,
    status: { type: String, default: "new" },
    declinedBy: { type: [String], default: [] },
    completedAt: String,
  },
  { timestamps: true }
);

const Job = mongoose.models.Job || mongoose.model("Job", JobSchema);

const SAMPLE_JOBS = [
  {
    category: "Plumber",
    clientName: "Amara Okafor",
    clientPhone: "0812 345 6789",
    address: "12 Admiralty Way, Lekki Phase 1",
    scheduledFor: "Today, 2:00 PM",
    price: 15000,
    description: "Leaking pipe under kitchen sink, needs urgent fix.",
  },
  {
    category: "Plumber",
    clientName: "Tunde Bakare",
    clientPhone: "0705 678 1234",
    address: "9 Allen Avenue, Ikeja",
    scheduledFor: "Today, 4:30 PM",
    price: 8000,
    description: "Blocked bathroom drain.",
  },
  {
    category: "Electrician",
    clientName: "Segun Adeyemi",
    clientPhone: "0803 999 1122",
    address: "3 Bourdillon Road, Ikoyi",
    scheduledFor: "Today, 5:00 PM",
    price: 18000,
    description: "Rewire faulty socket circuit.",
  },
];

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not found in .env.local");

  await mongoose.connect(uri);
  console.log("Connected to MongoDB");

  await Job.insertMany(SAMPLE_JOBS);
  console.log(`Inserted ${SAMPLE_JOBS.length} sample jobs`);

  await mongoose.disconnect();
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
