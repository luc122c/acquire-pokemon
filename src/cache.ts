import { createStorage } from "unstorage";
import localStorageDriver from "unstorage/drivers/localstorage";

export const localStorage = createStorage({
  driver: localStorageDriver({ base: "poke:" }),
});
