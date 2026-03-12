import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

import { buttonStyles } from "../../../common-styles";

const NAME = "search-button";

@customElement(NAME)
export class SearchInput extends LitElement {
  static styles = css`
    #search-button {
      ${buttonStyles};
      margin-left: 20px;
    }
  `;

  render() {
    return html`<button
      id="search-button"
      type="button"
      aria-label="Search Button"
      aria-describedby="Click to search for videos"
    >
      SEARCH
    </button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: SearchInput;
  }
}
