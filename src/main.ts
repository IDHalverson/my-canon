import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";

import { buttonStyles } from "./common-styles";

const NAME = "my-canon";

export enum PageEnum {
  Search = "Search",
  Bookmarks = "Bookmarks",
}

@customElement(NAME)
export class MyCanon extends LitElement {
  @state()
  private _page: PageEnum = PageEnum.Search;

  static styles = css`
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
  `;

  private _handleClickSearchNav = () => {
    this._page = PageEnum.Search;
  };

  private _handleClickBookmarksNav = () => {
    this._page = PageEnum.Bookmarks;
  };

  render() {
    return html`
      <feature-flags-context-wrapper>
        <theme-context-wrapper>
          <theme-css-handler>
          <bookmarks-context-wrapper>
            <user-selections-context-wrapper>
              <toast-context-wrapper>
                <toast-handler></toast-handler>
                <main>
                  ${
                    this._page === PageEnum.Search
                      ? html`<search-page></search-page>`
                      : html`<bookmarks-page></bookmarks-page>`
                  }
                </main>
                <div id="footer">
                  <button role="navigation" aria-label="Navigate to Search Page" aria-describedby="Click to navigate to the Search page" @click=${
                    this._handleClickSearchNav
                  }>Search</button>
                  <button role="navigation" aria-label="Navigate to Bookmarks Page" aria-describedby="Click to navigate to the Bookmarks page" @click=${
                    this._handleClickBookmarksNav
                  }>My Bookmarks</button>
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
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: MyCanon;
  }
}
