import { observable, ObservableObject } from "@legendapp/state";
import {
  configureObservablePersistence,
  persistObservable,
} from "@legendapp/state/persist";
import { ObservablePersistMMKV } from "@legendapp/state/persist-plugins/mmkv";

// Global configuration
configureObservablePersistence({
  pluginLocal: ObservablePersistMMKV,
});

interface Storage {
  isAuth?: boolean;
  isOnboarded: boolean;

  // getters
  getIsAuth: () => boolean | undefined;
  getIsOnBoarded: () => boolean | undefined;

  // setters
  setAuthenticated: (authenticated: boolean) => void;
  setIsOnBoarded: (isOnboarded: boolean) => void;
}

export const storage = observable<Storage>({
  isAuth: false,
  isOnboarded: false,

  // getters
  getIsAuth: () => storage.isAuth?.get(),
  getIsOnBoarded: () => storage.isOnboarded?.get(),

  // setters
  setAuthenticated: (authenticated: boolean) =>
    storage.isAuth?.set?.(authenticated),
  setIsOnBoarded: (isOnboarded: boolean) =>
    storage.isOnboarded?.set?.(isOnboarded),
}) as ObservableObject<Storage>;

persistObservable(storage, {
  local: "store",
});
