export const DEMO_SESSION_STORAGE_KEY = "sureli-demo-session";

export type DemoSession = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  dateOfBirth: string;
  avatarUrl?: string;
};

export const defaultDemoSession: DemoSession = {
  firstName: "Ar",
  lastName: "Raihan",
  phone: "+8847564238472",
  email: "arraihan815@gmail.com",
  dateOfBirth: "15/11/2002",
  avatarUrl: "",
};
