import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { provide } from "@lit/context";

import {
  INITIAL_USER_SELECTIONS,
  UserSelections,
  userSelectionsContext,
  UserSelectionsKeys,
  userSelectionsMethodsContext,
  UserSelectionsPublicMethods,
} from "./UserSelectionsContext.js";

const NAME = "user-selections-context-wrapper";

@customElement(NAME)
export class UserSelectionsContextWrapper extends LitElement {
  // User Selections object
  @provide({ context: userSelectionsContext })
  @property({ attribute: false })
  protected _userSelections: UserSelections = INITIAL_USER_SELECTIONS;

  // User Selections methods context
  @provide({ context: userSelectionsMethodsContext })
  @property({ attribute: false })
  protected _userSelectionsMethodsContext: UserSelectionsPublicMethods = {
    setSearchTerm: (searchTerm) => {
      this._userSelections = {
        ...this._userSelections,
        [UserSelectionsKeys.SearchTerm]: searchTerm,
      };
    },
    setSortChoice: (sortChoice) => {
      this._userSelections = {
        ...this._userSelections,
        [UserSelectionsKeys.SortChoice]: sortChoice,
      };
    },
    setSortDirection: (sortDirection) => {
      this._userSelections = {
        ...this._userSelections,
        [UserSelectionsKeys.SortDirection]: sortDirection,
      };
    },
  };

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: UserSelectionsContextWrapper;
  }
}
