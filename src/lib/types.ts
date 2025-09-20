export type Project = {
  id: string;
  title: string;
  description: string;
  deadline: string;
  reward: string;
  requirements: string[];
  companyName: string;
  companyLogoUrl: string;
};

export type Student = {
  id: string;
  name: string;
  email: string;
  college: string;
  bio: string;
  skills: string[];
  avatarUrl: string;
};
