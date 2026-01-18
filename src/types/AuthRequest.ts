import { IUserDocument } from "../modules/users/user.model";

export interface AuthRequest extends Request {
  userId: string;
  userRole: string;
  user?: IUserDocument;
}
