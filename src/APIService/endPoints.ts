const ENDPOINTS = {
  login: `login`,
  signUp: `user/signup`,
  resendOtp: `user/resend-otp`,
  verifyEmail: `user/email/verify`,
  verifyPasswordOtp: `verify-otp`,
  forgotPassword: `forgot-password`,
  updatePAssword: `otp-new-password-verification`,
  updateUserData: "user/update/details",
  getUserData: "user/user-info",
  getAllFAQs: "user/FAQs/get-all",
  getFilters: "user/audio/filters",
  getHomeData: "user/home",
  searchAudio: "user/search/audio",
  collectionData: "user/collections/",
  discoverData: "user/search/collections/",
  audioHistory: "user/audio-history",
  getCompanyNames: "company-list?description=",
  getTerms: "user/settings?type=termsAndConditions",
  getPrivacyPolicy: "user/settings?type=privacyPolicy",
};

export default ENDPOINTS;
