import { createContext } from "@lit/context";
export const TOAST_METHODS_INITIAL = [];
export const DEFAULT_TOAST_TIMEOUT = 5000;
export const toastMethodsContext = createContext("toastMethodsContext");
export const toastMessagesContext = createContext("toastMessagesContext");
