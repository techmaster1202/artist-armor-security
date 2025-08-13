export interface ChangeProfileProps {
  [key: string]: any;
}

export interface ProfileData {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: string;
  updatedAt: string;
}
