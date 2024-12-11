export type User = {
  email: string;
  username: string;
  fullname: string;
  user_id: string;
  role_id: string;
};

export type TokenPayload = {
  user_id: string;
  role_id: string;
  permission: Array<{
    page_id: number;
    fcreate: boolean;
    fread: boolean;
    fupdate: boolean;
    fdelete: boolean;
  }>;
};
