export interface User {
  id: number;
  username: string;
  password: string;
  role: "admin";
  email: string;
  fullName: string;
  isActive: boolean;
}
