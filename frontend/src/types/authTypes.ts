export interface SigninForm {
  email: string;
  password: string;
}

export type User = {
  id: string;
  name: string;
  email: string;
  created_at: Date | string;
};
