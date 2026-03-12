var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { Task } from "@lit/task";
import { buttonStyles, universalStyles } from "../../common-styles";
import { bookmarksContext, bookmarksMethodsContext, } from "../../context/BookmarksContext";
import { getVideoListTask, } from "../../services/youtube-list.js";
const NAME = "bookmarks-page";
let BookmarksPage = class BookmarksPage extends LitElement {
    constructor() {
        super(...arguments);
        this._bookmarksTask = new Task(this, {
            autoRun: false,
            task: async ([bookmarkIds], { signal }) => {
                const response = await getVideoListTask(this, [bookmarkIds], signal);
                return response;
            },
        });
        this._handleClickReset = () => {
            this._bookmarksMethods?.resetBookmarks();
        };
    }
    static { this.styles = css `
    :host {
      ${universalStyles};
      width: 100%;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: flex-start;
    }

    h1 {
      text-align: center;
    }

    #header-row-container {
      position: fixed;
      top: 0px;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      background: var(--background);
      align-items: center;
    }

    .reset-button {
      ${buttonStyles};
      width: 170px;
    }

    .bump-down {
      margin-top: 250px;
    }
  `; }
    // Execute search when page loads
    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has("_bookmarks")) {
            this._bookmarksTask.run([this._bookmarks || []]);
        }
    }
    render() {
        return html `
      <div id="header-row-container">
        <h1>MyCanon - Bookmarks</h1>
        <button
          class="reset-button"
          aria-label="Reset Bookmarks Button"
          aria-describedby="Click to reset all bookmarks permanently"
          @click=${this._handleClickReset}
        >
          Reset Bookmarks
        </button>
      </div>
      ${this._bookmarksTask?.render({
            pending: () => html `<div class="bump-down">Loading bookmarked videos...</div>`,
            complete: ((videoResponse) => {
                return !videoResponse?.items?.length
                    ? html `<div class="bump-down">No Bookmarks.</div>`
                    : html `<video-list ._items=${videoResponse?.items}></video-list>`;
            }),
            error: (e) => html `<div class="bump-down">Error: ${e}</div>`,
        })}
      <video-list></video-list>
    `;
    }
};
__decorate([
    consume({ context: bookmarksContext, subscribe: true }),
    property()
], BookmarksPage.prototype, "_bookmarks", void 0);
__decorate([
    consume({ context: bookmarksMethodsContext }),
    property()
], BookmarksPage.prototype, "_bookmarksMethods", void 0);
BookmarksPage = __decorate([
    customElement(NAME)
], BookmarksPage);
export { BookmarksPage };
