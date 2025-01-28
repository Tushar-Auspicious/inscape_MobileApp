import { observable, ObservableObject } from "@legendapp/state";
import { configureObservableSync } from "@legendapp/state/sync";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";
import { syncObservable } from "@legendapp/state/sync";

// Global configuration
configureObservableSync({
  persist: {
    plugin: ObservablePersistMMKV,
  },
});

interface Storage {
  isAuth?: boolean;
  isOnboarded: boolean;
  isTermsAccepted: boolean;

  // getters
  getIsAuth: () => boolean | undefined;
  getIsOnBoarded: () => boolean | undefined;
  getIsTermsAccepted: () => boolean | undefined;

  // setters
  setAuthenticated: (authenticated: boolean) => void;
  setIsOnBoarded: (isOnboarded: boolean) => void;
  setIsTermsAccepted: (isTermsAccepted: boolean) => void;
}

export const storage = observable<Storage>({
  isAuth: false,
  isOnboarded: false,
  isTermsAccepted: false,

  // getters
  getIsAuth: () => storage.isAuth?.get(),
  getIsOnBoarded: () => storage.isOnboarded?.get(),
  getIsTermsAccepted: () => storage.isTermsAccepted?.get(),

  // setters
  setAuthenticated: (authenticated: boolean) =>
    storage.isAuth?.set?.(authenticated),
  setIsOnBoarded: (isOnboarded: boolean) =>
    storage.isOnboarded?.set?.(isOnboarded),
  setIsTermsAccepted: (isTermsAccepted: boolean) =>
    storage.isTermsAccepted?.set?.(isTermsAccepted),
}) as ObservableObject<Storage>;

syncObservable(storage, {
  persist: {
    name: "gettingStarted",
  },
});
