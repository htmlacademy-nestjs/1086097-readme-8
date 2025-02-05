export interface Subscriber {
  id?: string;
  email: string | string[];
  name: string;
  dateLastNotify?: string;
}
