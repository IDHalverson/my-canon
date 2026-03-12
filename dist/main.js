var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { buttonStyles } from "./common-styles";
const NAME = "my-canon";
export var PageEnum;
(function (PageEnum) {
    PageEnum["Search"] = "Search";
    PageEnum["Bookmarks"] = "Bookmarks";
})(PageEnum || (PageEnum = {}));
let MyCanon = class MyCanon extends LitElement {
    constructor() {
        super(...arguments);
        this._page = PageEnum.Search;
        this._handleClickSearchNav = () => {
            this._page = PageEnum.Search;
        };
        this._handleClickBookmarksNav = () => {
            this._page = PageEnum.Bookmarks;
        };
    }
    static { this.styles = css `
    #footer {
      background: var(--background);
      position: fixed;
      bottom: 0px;
      height: 50px;
      width: 100vw;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      box-shadow: 0px 0px 10px lightgray;
    }

    #footer button {
      ${buttonStyles};
      margin: 0px 20px;
    }
  `; }
    render() {
        return html `
      <feature-flags-context-wrapper>
        <theme-context-wrapper>
          <theme-css-handler>
          <bookmarks-context-wrapper>
            <user-selections-context-wrapper>
              <toast-context-wrapper>
                <toast-handler></toast-handler>
                <main>
                  ${this._page === PageEnum.Search
            ? html `<search-page></search-page>`
            : html `<bookmarks-page></bookmarks-page>`}
                </main>
                <div id="footer">
                  <button role="navigation" aria-label="Navigate to Search Page" aria-describedby="Click to navigate to the Search page" @click=${this._handleClickSearchNav}>Search</button>
                  <button role="navigation" aria-label="Navigate to Bookmarks Page" aria-describedby="Click to navigate to the Bookmarks page" @click=${this._handleClickBookmarksNav}>My Bookmarks</button>
                </footer>
                <initializer-component></initializer-component>
              </toast-context-wrapper>
            </user-selections-context-wrapper>
            </bookmarks-context-wrapper>
          </theme-css-handler>
        </theme-context-wrapper>
      </feature-flags-context-wrapper>
    `;
    }
};
__decorate([
    state()
], MyCanon.prototype, "_page", void 0);
MyCanon = __decorate([
    customElement(NAME)
], MyCanon);
export { MyCanon };
