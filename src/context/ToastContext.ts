import { createContext } from "@lit/context";

export interface ToastMessage {
  uuid?: string;
  text: string;
}

export type ToastMessages = ToastMessage[];

export interface ToastPublicMethods {
  /**
   * @param toast
   * @param timeoutMS – Defaults to var DEFAULT_TOAST_TIMEOUT
   * @returns
   */
  dispatchToast: (toast: ToastMessage, timeoutMS?: number) => void;
}

export const TOAST_METHODS_INITIAL = [];

export const DEFAULT_TOAST_TIMEOUT = 5000;

export const toastMethodsContext = createContext<ToastPublicMethods>(
  "toastMethodsContext"
);

export const toastMessagesContext = createContext<ToastMessages>(
  "toastMessagesContext"
);
