var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { consume } from "@lit/context";
import { toastMessagesContext, } from "../../context/ToastContext";
const NAME = "toast-handler";
let ToastHandler = class ToastHandler extends LitElement {
    static { this.styles = css `
    #toasts-container {
      position: fixed;
      top: 5vh;
      right: 5vw;
      display: flex;
      flex-flow: column nowrap;
      align-items: flex-start;
      justify-content: space-between;
      z-index: 1;
    }
  `; }
    render() {
        return html `
      <div id="toasts-container">
        ${repeat(this._toastMessages || [], (toast) => toast.uuid, (toast) => html `<toast-message>${toast.text}</toast-message>`)}
      </div>
    `;
    }
};
__decorate([
    consume({ context: toastMessagesContext, subscribe: true }),
    property({ attribute: false })
], ToastHandler.prototype, "_toastMessages", void 0);
ToastHandler = __decorate([
    customElement(NAME)
], ToastHandler);
export { ToastHandler };
