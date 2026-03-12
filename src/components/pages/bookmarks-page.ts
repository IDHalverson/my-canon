import { css, CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

import { consume } from "@lit/context";
import { Task } from "@lit/task";

import { buttonStyles, universalStyles } from "../../common-styles";
import {
  Bookmarks,
  bookmarksContext,
  bookmarksMethodsContext,
  BookmarksPublicMethods,
} from "../../context/BookmarksContext";
import {
  getVideoListTask,
  YoutubeListResponse,
} from "../../services/youtube-list.js";

const NAME = "bookmarks-page";

@customElement(NAME)
export class BookmarksPage extends LitElement {
  @consume({ context: bookmarksContext, subscribe: true })
  @property()
  private _bookmarks?: Bookmarks;

  @consume({ context: bookmarksMethodsContext })
  @property()
  private _bookmarksMethods?: BookmarksPublicMethods;

  static styles: CSSResultGroup = css`
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
  `;

  private _bookmarksTask = new Task(this, {
    autoRun: false,
    task: async (
      [bookmarkIds]: [string[]],
      { signal }
    ): Promise<YoutubeListResponse | undefined> => {
      const response = await getVideoListTask(this, [bookmarkIds], signal);
      return response;
    },
  });

  // Execute search when page loads
  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has("_bookmarks")) {
      this._bookmarksTask.run([this._bookmarks || []]);
    }
  }

  _handleClickReset = () => {
    this._bookmarksMethods?.resetBookmarks();
  };

  render() {
    return html`
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
        pending: () =>
          html`<div class="bump-down">Loading bookmarked videos...</div>`,
        complete: ((videoResponse?: YoutubeListResponse) => {
          return !videoResponse?.items?.length
            ? html`<div class="bump-down">No Bookmarks.</div>`
            : html`<video-list ._items=${videoResponse?.items}></video-list>`;
        }) as (v: unknown) => void,
        error: (e) => html`<div class="bump-down">Error: ${e}</div>`,
      })}
      <video-list></video-list>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: BookmarksPage;
  }
}
