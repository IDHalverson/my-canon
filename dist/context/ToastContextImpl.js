var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { v4 as uuidV4 } from "uuid";
import { provide } from "@lit/context";
import { DEFAULT_TOAST_TIMEOUT, TOAST_METHODS_INITIAL, toastMessagesContext, toastMethodsContext, } from "./ToastContext";
const NAME = "toast-context-wrapper";
/**
 * Sets toast message in state and returns unique uuid
 *
 * @param toastComponent
 * @returns
 */
const addToast = (toastComponent) => (toast) => {
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
const removeToast = (toastComponent) => (uuid) => {
    toastComponent._toastMessages = toastComponent._toastMessages.filter((toast) => toast.uuid !== uuid);
};
/** Calls addToast() and calls removeToast() according to timeout. JS Docs in ToastMethods type. */
const dispatchToast = (toastComponent) => (toast, timeoutMS = DEFAULT_TOAST_TIMEOUT) => {
    const uuid = addToast(toastComponent)(toast);
    setTimeout(() => {
        removeToast(toastComponent)(uuid);
    }, timeoutMS);
};
let ToastContextWrapper = class ToastContextWrapper extends LitElement {
    constructor() {
        super(...arguments);
        // Toast Messages state context
        this._toastMessages = TOAST_METHODS_INITIAL;
        // Toast Message methods context
        this._toastMethodsContext = {
            dispatchToast: dispatchToast(this),
        };
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    provide({ context: toastMessagesContext }),
    property({ attribute: false })
], ToastContextWrapper.prototype, "_toastMessages", void 0);
__decorate([
    provide({ context: toastMethodsContext }),
    property({ attribute: false })
], ToastContextWrapper.prototype, "_toastMethodsContext", void 0);
ToastContextWrapper = __decorate([
    customElement(NAME)
], ToastContextWrapper);
export { ToastContextWrapper };
