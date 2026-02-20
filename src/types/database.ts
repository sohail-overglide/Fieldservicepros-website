export type ClientPortalRow = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  company_name: string | null;
  created_at: string;
};

export type CandidatesPortalRow = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  created_at: string;
};

export type AdminUserRow = {
  id: number;
  username: string;
  password_hash: string;
  created_at: string;
};
