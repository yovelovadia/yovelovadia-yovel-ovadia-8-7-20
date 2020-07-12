import { Document } from "mongoose";

export interface NewUser extends Document {
  name: string;
  email: string;
  password: string;
  admin: boolean;
}

export interface Task extends Document {
  taskName: string;
  userID: number;
}

export interface jsonRes {
  message?: string;
  error?: string;
}

declare module express {
  export interface Request {
    decoded: string;
  }
}
