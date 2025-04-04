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

export interface Level {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface BestFor {
  _id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetUserDataResponse {
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
  __v: number;
}

export type GetAllFaqResponse = FAQItem[];

export interface FAQItem {
  _id: string;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface GetFilterResponse {
  bestForList: BestFor[];
  levels: Level[];
}

export interface GetHomeDataResponse {
  suggestedCollection: SuggestedCollection[];
  trendingAudio: TrendingAudio[];
  collection: Collection;
  breathing: Breathing[];
  meditationType: MeditationType[];
}

export interface SuggestedCollection {
  _id: string;
  name: string;
  imageUrl: string;
  levels: Level[];
  bestFor: BestFor[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TrendingAudio {
  _id: string;
  count: number;
  audioDetails: AudioDetails;
}

export interface AudioDetails {
  _id: string;
  songName: string;
  collectionType: string;
  audioUrl: string;
  imageUrl: string;
  description: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bestFor: BestFor[];
  levels: any[];
}

export interface Collection {
  _id: string;
  name: string;
  bestFor: BestFor[];
  levels: Level[];
  audioCount: number;
  audios: Audio[];
}

export interface Audio {
  _id: string;
  songName: string;
  collectionType: string;
  audioUrl: string;
  imageUrl: string;
  description: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bestFor: BestFor[];
  levels: any[];
}

export interface Breathing {
  _id: string;
  songName: string;
  collectionType?: CollectionType;
  audioUrl: string;
  imageUrl: string;
  description: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  bestFor: BestFor[];
  levels: Level[];
}

export interface CollectionType {
  _id: string;
  name: string;
  imageUrl: string;
  levels: Level[];
  bestFor: BestFor[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface MeditationType {
  _id: string;
  name: string;
  audioCount: number;
}

// Search AUDIO -------------------------------------

export interface GetSearchAudioResponse {
  _id: string;
  songName: string;
  collectionType: CollectionType;
  levels: Level[];
  bestFor: BestFor[];
  audioUrl: string;
  imageUrl: string;
  description: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Collection Data Respponse -------------------------------------

export interface GetCollectionResponse {
  collection: CollectionData;
  audioFiles: AudioFile[];
}

export interface CollectionData {
  _id: string;
  name: string;
  imageUrl: string;
  levels: Level[];
  bestFor: BestFor[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface AudioFile {
  _id: string;
  songName: string;
  collectionType: string;
  levels: string[];
  bestFor: string[];
  audioUrl: string;
  imageUrl: string;
  description: string;
  duration: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

// Discover Results -------------------------------------

export interface DiscoverResults {
  _id: string;
  name: string;
  imageUrl: string;
  levels: Level[];
  bestFor: BestFor[];
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  audioCount: number;
}
