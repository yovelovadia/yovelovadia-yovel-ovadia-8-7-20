export interface UserInfo {
  email: string;
  password: string;
  name?: string;
  admin?: boolean;
}

export interface TextInputProps {
  name: string;
  placeholder: string;
  handleChange: (action: string, data?: string) => void;
  type?: string;
}

export interface TaskInputProps {
  task: { _id: string; taskName: string };
}
