export type Args = {
  id?: number;
  content?: string;
  createdAt?: string;
};

export type UserInput = {
  username: string;
  password: string;
};

export type UserResponse = {
  errors?: [
    {
      field?: string;
      message?: string;
    }
  ];
  user?: any;
};
