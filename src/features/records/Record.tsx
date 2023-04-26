export interface Record {
  keys(): ['name', 'email', 'phone'];
  id: number;
  name: string;
  email: string;
  phone: string;
  creation: Date;
};