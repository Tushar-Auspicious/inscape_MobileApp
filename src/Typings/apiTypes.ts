export interface LoginResponse {
  user: User;
  token: string;
}

export interface User {
  _id: string;
  identifier: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  profilePic: any;
  gender: string;
  dob: string;
  isBlocked: boolean;
  isAccountActive: boolean;
  emailVerified: boolean;
  isVerifiedByCompany: string;
  isTermsAccepted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SignUpresponse {
  userData: UserData;
}

export interface UserData {
  identifier: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  companyName: string;
  profilePic: any;
  gender: string;
  dob: string;
  isBlocked: boolean;
  isAccountActive: boolean;
  emailVerified: boolean;
  isVerifiedByCompany: string;
  isTermsAccepted: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
