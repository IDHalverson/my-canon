import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { v4 as uuidV4 } from "uuid";

import { provide } from "@lit/context";

import {
  DEFAULT_TOAST_TIMEOUT,
  TOAST_METHODS_INITIAL,
  ToastMessage,
  ToastMessages,
  toastMessagesContext,
  toastMethodsContext,
  ToastPublicMethods,
} from "./ToastContext";

const NAME = "toast-context-wrapper";

interface BaseToastComponent {
  _toastMessages: ToastMessages;
}

/**
 * Sets toast message in state and returns unique uuid
 *
 * @param toastComponent
 * @returns
 */
const addToast =
  <ToastComponent extends BaseToastComponent>(toastComponent: ToastComponent) =>
  (toast: ToastMessage): string => {
    const uuid = uuidV4();
    const finalToast = {
      ...toast,
      uuid,
    };
    toastComponent._toastMessages = [
      finalToast,
      ...toastComponent._toastMessages,
    ];
    return uuid;
  };

/**
 * Removes message from state by uuid
 *
 * @param toastComponent
 * @returns
 */
const removeToast =
  <ToastComponent extends BaseToastComponent>(toastComponent: ToastComponent) =>
  (uuid: string) => {
    toastComponent._toastMessages = toastComponent._toastMessages.filter(
      (toast) => toast.uuid! !== uuid
    );
  };

/** Calls addToast() and calls removeToast() according to timeout. JS Docs in ToastMethods type. */
const dispatchToast: <ToastComponent extends BaseToastComponent>(
  toastComponent: ToastComponent
) => ToastPublicMethods["dispatchToast"] =
  (toastComponent) =>
  (toast, timeoutMS = DEFAULT_TOAST_TIMEOUT) => {
    const uuid = addToast(toastComponent)(toast);
    setTimeout(() => {
      removeToast(toastComponent)(uuid);
    }, timeoutMS);
  };

@customElement(NAME)
export class ToastContextWrapper extends LitElement {
  // Toast Messages state context
  @provide({ context: toastMessagesContext })
  @property({ attribute: false })
  _toastMessages: ToastMessages = TOAST_METHODS_INITIAL;

  // Toast Message methods context
  @provide({ context: toastMethodsContext })
  @property({ attribute: false })
  protected _toastMethodsContext: ToastPublicMethods = {
    dispatchToast: dispatchToast(this),
  };

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: ToastContextWrapper;
  }
}
