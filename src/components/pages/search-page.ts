import { css, CSSResultGroup, html, LitElement, PropertyValues } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { consume } from "@lit/context";
import { Task } from "@lit/task";

import { universalStyles } from "../../common-styles";
import {
  SortChoice,
  UserSelections,
  userSelectionsContext,
  UserSelectionsKeys,
  userSelectionsMethodsContext,
  UserSelectionsPublicMethods,
} from "../../context/UserSelectionsContext";
import {
  userSelectionsSearchTask,
  YoutubeSearchResponse,
} from "../../services/youtube-search.js";

const NAME = "search-page";
@customElement(NAME)
export class SearchPage extends LitElement {
  @consume({ context: userSelectionsMethodsContext })
  @property({ attribute: false })
  private _userSelectionsMethods?: UserSelectionsPublicMethods;

  @consume({ context: userSelectionsContext, subscribe: true })
  @property({ attribute: false })
  private _userSelections?: UserSelections;

  @query("search-input")
  private _searchInput?: HTMLInputElement;

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

    #search-row-container {
      position: fixed;
      top: 0px;
      display: flex;
      flex-flow: column nowrap;
      width: 100%;
      background: var(--background);
      box-shadow: 0px 0px 10px lightgray;
    }

    #search-row {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      padding: 25px 0px;
    }

    #sorting-row {
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: center;
      padding: 25px 0px;
    }

    .sort-chip {
      padding: 2px 10px;
      border: 2px solid black;
      border-radius: 10px;
      margin: 0px 10px;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }

    .sort-chip.selected {
      background: rgba(0, 0, 0, 0.3);
    }

    .bump-down {
      margin-top: 250px;
    }
  `;

  private _setSearchTerm = () => {
    const searchTerm = this._searchInput?.value;
    this._userSelectionsMethods?.setSearchTerm(searchTerm ?? "");
  };

  private _handleInputKeydown = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      this._setSearchTerm();
    }
  };

  private _handleClickSearch = () => {
    this._setSearchTerm();
  };

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    const existingSearch =
      this._userSelections?.[UserSelectionsKeys.SearchTerm];
    if (existingSearch) {
      if (this._searchInput) this._searchInput.value = existingSearch;
    }
  }

  // Execute search when user selections change
  protected _searchTask = new Task(this, {
    task: async (
      [searchTerm, sortChoice],
      { signal }
    ): Promise<YoutubeSearchResponse | undefined> => {
      // Should never really happen
      if (!searchTerm) return;
      const response = await userSelectionsSearchTask(
        this,
        [searchTerm, sortChoice],
        signal
      );
      return response;
    },
    args: () => [
      this._userSelections?.[UserSelectionsKeys.SearchTerm],
      this._userSelections?.[UserSelectionsKeys.SortChoice],
      this._userSelections,
    ],
  });

  _handleClickSortChip = (e: Event) => {
    if (this._userSelections) {
      const sortVal = (e.target as HTMLDivElement).getAttribute("data-val");
      const newSortChoice =
        sortVal === SortChoice.Date
          ? SortChoice.Date
          : sortVal === SortChoice.Rating
          ? SortChoice.Rating
          : SortChoice.Relevance;
      if (newSortChoice) {
        if (
          this._userSelections[UserSelectionsKeys.SortChoice] !== newSortChoice
        ) {
          this._userSelectionsMethods?.setSortChoice(newSortChoice);
        }
      }
    }
  };

  render() {
    return html`
      <div id="search-row-container">
        <h1>MyCanon - Search</h1>
        <div id="search-row">
          <search-input @keydown=${this._handleInputKeydown}></search-input>
          <search-button @click=${this._handleClickSearch}> </search-button>
        </div>
        <div id="sorting-row">
          ${repeat(
            Object.values(SortChoice),
            (c) => c,
            (c) =>
              html`<button
                type="button"
                aria-label="Sort by ${c}"
                aria-describedby="Click to sort  by ${c}"
                class="sort-chip ${this._userSelections?.[
                  UserSelectionsKeys.SortChoice
                ] === c
                  ? "selected"
                  : ""}"
                data-val="${c}"
                @click=${this._handleClickSortChip}
              >
                ${c}
              </button>`
          )}
        </div>
      </div>
      ${this._searchTask?.render({
        pending: () =>
          html`<div class="bump-down" aria-label="Loading message" role="info">
            Loading videos...
          </div>`,
        complete: ((videoResponse?: YoutubeSearchResponse) => {
          return !videoResponse?.items?.length
            ? html`<div
                class="bump-down"
                aria-label="No results message"
                role="info"
              >
                No Results.
              </div>`
            : html`<video-list ._items=${videoResponse?.items}></video-list>`;
        }) as (v: unknown) => void,
        error: (e) =>
          html`<div class="bump-down" role="error" aria-label="Error message">
            Error: ${e}
          </div>`,
      })}
      <video-list></video-list>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: SearchPage;
  }
}
