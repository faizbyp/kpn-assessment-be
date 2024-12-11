declare namespace Express {
  interface Request {
    userDecode?: {
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
  }
}
