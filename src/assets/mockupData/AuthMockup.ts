import { User } from "../assets/types/Role";

export const Auths: User[] = [
  {
    id: 1,
    username: "admin1",
    password: "adminpassword123",
    role: "admin",
    email: "admin1@example.com",
    fullName: "Admin One",
    isActive: true,
  },
  {
    id: 2,
    username: "admin2",
    password: "adminpassword456",
    role: "admin",
    email: "admin2@example.com",
    fullName: "Admin Two",
    isActive: true,
  },
];
