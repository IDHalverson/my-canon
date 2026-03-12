import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { universalStyles } from "../../../common-styles";

const NAME = "toast-message";

@customElement(NAME)
export class ToastMessage extends LitElement {
  static styles = css`
    .toast-message {
      ${universalStyles}
      background: var(--elementBackground, white);
      border: 3px solid var(--elementAccent);
      color: black;
      padding: 12px;
      border-radius: 5px;
    }
  `;

  render() {
    return html`
      <div class="toast-message" aria-label="Toast Message"><slot></slot></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: ToastMessage;
  }
}
