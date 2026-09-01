export const TECHNICIAN_STATUS = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
  SUSPENDED: "suspended",
  BLACKLISTED: "blacklisted",
} as const;

export type TechnicianStatus = (typeof TECHNICIAN_STATUS)[keyof typeof TECHNICIAN_STATUS];

export const AVAILABILITY = {
  ONLINE: "online",
  OFFLINE: "offline",
} as const;

export type Availability = (typeof AVAILABILITY)[keyof typeof AVAILABILITY];

export const JOB_STATUS = {
  NEW: "new",
  ACCEPTED: "accepted",
  COMPLETED: "completed",
} as const;

export type JobStatusValue = (typeof JOB_STATUS)[keyof typeof JOB_STATUS];

export const MIN_PORTFOLIO_PHOTOS = 3;