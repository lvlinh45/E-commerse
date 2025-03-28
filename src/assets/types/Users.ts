export interface AccountAdmin {
  id: number;
  username: string;
  password: string;
  email: string;
  role: string;
  fullName: string;
  phone: string;
  createdAt: string;
  status: "active" | "inactive";
  jobTitle: string;
  profileImageUrl: string;
}
