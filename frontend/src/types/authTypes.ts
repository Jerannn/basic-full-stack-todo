export interface SigninForm {
  email: string;
  password: string;
}

export interface SignupForm extends SigninForm {
  name: string;
}

export type User = {
  readonly id: string;
  name: string;
  email: string;
  created_at: Date | string;
};
