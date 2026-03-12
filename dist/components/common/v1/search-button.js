var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { buttonStyles } from "../../../common-styles";
const NAME = "search-button";
let SearchInput = class SearchInput extends LitElement {
    static { this.styles = css `
    #search-button {
      ${buttonStyles};
      margin-left: 20px;
    }
  `; }
    render() {
        return html `<button
      id="search-button"
      type="button"
      aria-label="Search Button"
      aria-describedby="Click to search for videos"
    >
      SEARCH
    </button>`;
    }
};
SearchInput = __decorate([
    customElement(NAME)
], SearchInput);
export { SearchInput };
