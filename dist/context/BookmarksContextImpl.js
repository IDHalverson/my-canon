var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { deleteBookmarks, removeBookmark, retrieveBookmarks, storeBookmark, } from "../services/bookmarks.js";
import { BOOKMARKS_INITIAL, bookmarksContext, bookmarksMethodsContext, } from "./BookmarksContext.js";
const NAME = "bookmarks-context-wrapper";
let BookmarksContextWrapper = class BookmarksContextWrapper extends LitElement {
    constructor() {
        super(...arguments);
        // Bookmarks state context
        this._bookmarks = BOOKMARKS_INITIAL;
        // Bookmarks methods context
        this._bookmarksMethodsContext = {
            addBookmark: (videoId) => {
                storeBookmark(videoId);
                this._bookmarks = retrieveBookmarks();
            },
            removeBookmark: (videoId) => {
                removeBookmark(videoId);
                this._bookmarks = retrieveBookmarks();
            },
            resetBookmarks: () => {
                deleteBookmarks();
                this._bookmarks = retrieveBookmarks();
            },
        };
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this._bookmarks = retrieveBookmarks();
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    provide({ context: bookmarksContext }),
    property({ attribute: false })
], BookmarksContextWrapper.prototype, "_bookmarks", void 0);
__decorate([
    provide({ context: bookmarksMethodsContext }),
    property({ attribute: false })
], BookmarksContextWrapper.prototype, "_bookmarksMethodsContext", void 0);
BookmarksContextWrapper = __decorate([
    customElement(NAME)
], BookmarksContextWrapper);
export { BookmarksContextWrapper };
