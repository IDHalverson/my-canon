import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { consume } from "@lit/context";

import {
  ToastMessages,
  toastMessagesContext,
} from "../../context/ToastContext";

const NAME = "toast-handler";

@customElement(NAME)
export class ToastHandler extends LitElement {
  @consume({ context: toastMessagesContext, subscribe: true })
  @property({ attribute: false })
  private _toastMessages?: ToastMessages;

  static styles: CSSResultGroup = css`
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
  `;

  render() {
    return html`
      <div id="toasts-container">
        ${repeat(
          this._toastMessages || [],
          (toast) => toast.uuid,
          (toast) => html`<toast-message>${toast.text}</toast-message>`
        )}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: ToastHandler;
  }
}
