var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
const NAME = "search-input";
let SearchInput = class SearchInput extends LitElement {
    constructor() {
        super(...arguments);
        this._onInput = (e) => {
            const input = e.target;
            this.value = input.value;
        };
    }
    static { this.styles = css `
    #search-input {
      background: var(--elementBackground);
      border: 3px solid var(--elementAccent);
    }
  `; }
    render() {
        return html `<input
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
};
__decorate([
    property()
], SearchInput.prototype, "value", void 0);
SearchInput = __decorate([
    customElement(NAME)
], SearchInput);
export { SearchInput };
