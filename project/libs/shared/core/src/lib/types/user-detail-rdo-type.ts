import { User } from "./user.interface";
export type UserDetailRdo = Pick<User, "id" | "email" | "name">;
