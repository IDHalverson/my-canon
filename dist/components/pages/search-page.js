var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, query } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { consume } from "@lit/context";
import { Task } from "@lit/task";
import { universalStyles } from "../../common-styles";
import { SortChoice, userSelectionsContext, UserSelectionsKeys, userSelectionsMethodsContext, } from "../../context/UserSelectionsContext";
import { userSelectionsSearchTask, } from "../../services/youtube-search.js";
const NAME = "search-page";
let SearchPage = class SearchPage extends LitElement {
    constructor() {
        super(...arguments);
        this._setSearchTerm = () => {
            const searchTerm = this._searchInput?.value;
            this._userSelectionsMethods?.setSearchTerm(searchTerm ?? "");
        };
        this._handleInputKeydown = (e) => {
            if (e.key === "Enter") {
                this._setSearchTerm();
            }
        };
        this._handleClickSearch = () => {
            this._setSearchTerm();
        };
        // Execute search when user selections change
        this._searchTask = new Task(this, {
            task: async ([searchTerm, sortChoice], { signal }) => {
                // Should never really happen
                if (!searchTerm)
                    return;
                const response = await userSelectionsSearchTask(this, [searchTerm, sortChoice], signal);
                return response;
            },
            args: () => [
                this._userSelections?.[UserSelectionsKeys.SearchTerm],
                this._userSelections?.[UserSelectionsKeys.SortChoice],
                this._userSelections,
            ],
        });
        this._handleClickSortChip = (e) => {
            if (this._userSelections) {
                const sortVal = e.target.getAttribute("data-val");
                const newSortChoice = sortVal === SortChoice.Date
                    ? SortChoice.Date
                    : sortVal === SortChoice.Rating
                        ? SortChoice.Rating
                        : SortChoice.Relevance;
                if (newSortChoice) {
                    if (this._userSelections[UserSelectionsKeys.SortChoice] !== newSortChoice) {
                        this._userSelectionsMethods?.setSortChoice(newSortChoice);
                    }
                }
            }
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
  `; }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        const existingSearch = this._userSelections?.[UserSelectionsKeys.SearchTerm];
        if (existingSearch) {
            if (this._searchInput)
                this._searchInput.value = existingSearch;
        }
    }
    render() {
        return html `
      <div id="search-row-container">
        <h1>MyCanon - Search</h1>
        <div id="search-row">
          <search-input @keydown=${this._handleInputKeydown}></search-input>
          <search-button @click=${this._handleClickSearch}> </search-button>
        </div>
        <div id="sorting-row">
          ${repeat(Object.values(SortChoice), (c) => c, (c) => html `<button
                type="button"
                aria-label="Sort by ${c}"
                aria-describedby="Click to sort  by ${c}"
                class="sort-chip ${this._userSelections?.[UserSelectionsKeys.SortChoice] === c
            ? "selected"
            : ""}"
                data-val="${c}"
                @click=${this._handleClickSortChip}
              >
                ${c}
              </button>`)}
        </div>
      </div>
      ${this._searchTask?.render({
            pending: () => html `<div class="bump-down" aria-label="Loading message" role="info">
            Loading videos...
          </div>`,
            complete: ((videoResponse) => {
                return !videoResponse?.items?.length
                    ? html `<div
                class="bump-down"
                aria-label="No results message"
                role="info"
              >
                No Results.
              </div>`
                    : html `<video-list ._items=${videoResponse?.items}></video-list>`;
            }),
            error: (e) => html `<div class="bump-down" role="error" aria-label="Error message">
            Error: ${e}
          </div>`,
        })}
      <video-list></video-list>
    `;
    }
};
__decorate([
    consume({ context: userSelectionsMethodsContext }),
    property({ attribute: false })
], SearchPage.prototype, "_userSelectionsMethods", void 0);
__decorate([
    consume({ context: userSelectionsContext, subscribe: true }),
    property({ attribute: false })
], SearchPage.prototype, "_userSelections", void 0);
__decorate([
    query("search-input")
], SearchPage.prototype, "_searchInput", void 0);
SearchPage = __decorate([
    customElement(NAME)
], SearchPage);
export { SearchPage };
