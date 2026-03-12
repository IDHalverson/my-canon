import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

import { provide } from "@lit/context";

import {
  deleteBookmarks,
  removeBookmark,
  retrieveBookmarks,
  storeBookmark,
} from "../services/bookmarks.js";
import {
  Bookmarks,
  BOOKMARKS_INITIAL,
  bookmarksContext,
  bookmarksMethodsContext,
  BookmarksPublicMethods,
} from "./BookmarksContext.js";

const NAME = "bookmarks-context-wrapper";

@customElement(NAME)
export class BookmarksContextWrapper extends LitElement {
  // Bookmarks state context
  @provide({ context: bookmarksContext })
  @property({ attribute: false })
  protected _bookmarks: Bookmarks = BOOKMARKS_INITIAL;

  // Bookmarks methods context
  @provide({ context: bookmarksMethodsContext })
  @property({ attribute: false })
  protected _bookmarksMethodsContext: BookmarksPublicMethods = {
    addBookmark: (videoId: string) => {
      storeBookmark(videoId);
      this._bookmarks = retrieveBookmarks();
    },
    removeBookmark: (videoId: string) => {
      removeBookmark(videoId);
      this._bookmarks = retrieveBookmarks();
    },
    resetBookmarks: () => {
      deleteBookmarks();
      this._bookmarks = retrieveBookmarks();
    },
  };

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this._bookmarks = retrieveBookmarks();
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: BookmarksContextWrapper;
  }
}
