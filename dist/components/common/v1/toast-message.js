var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { universalStyles } from "../../../common-styles";
const NAME = "toast-message";
let ToastMessage = class ToastMessage extends LitElement {
    static { this.styles = css `
    .toast-message {
      ${universalStyles}
      background: var(--elementBackground, white);
      border: 3px solid var(--elementAccent);
      color: black;
      padding: 12px;
      border-radius: 5px;
    }
  `; }
    render() {
        return html `
      <div class="toast-message" aria-label="Toast Message"><slot></slot></div>
    `;
    }
};
ToastMessage = __decorate([
    customElement(NAME)
], ToastMessage);
export { ToastMessage };
