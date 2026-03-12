import { css, CSSResultGroup, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

const NAME = "search-input";

@customElement(NAME)
export class SearchInput extends LitElement {
  @property()
  value?: string;

  static styles: CSSResultGroup = css`
    #search-input {
      background: var(--elementBackground);
      border: 3px solid var(--elementAccent);
    }
  `;

  private _onInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.value = input.value;
  };

  render() {
    return html`<input
      label="search"
      aria-label="Search Input"
      aria-describedby="Type a search term and press enter to search"
      placeholder="Enter a search..."
      autofocus
      id="search-input"
      .value="${this.value ?? ""}"
      @input=${this._onInput}
    />`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: SearchInput;
  }
}
