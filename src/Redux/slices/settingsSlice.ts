import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// Define a type for the slice state
interface SettingsState {
  termsAndConditions: null | string;
  privacyPolicy: null | string;
}

// Define the initial state using that type
const initialState: SettingsState = {
  termsAndConditions: null,
  privacyPolicy: null,
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setPrivacyPolicy: (state, action: PayloadAction<string>) => {
      state.privacyPolicy = action.payload;
    },
    setTermsAndCondition: (state, action: PayloadAction<string>) => {
      state.termsAndConditions = action.payload;
    },
  },
});

export const { setPrivacyPolicy, setTermsAndCondition } = settingsSlice.actions;

export default settingsSlice.reducer;
