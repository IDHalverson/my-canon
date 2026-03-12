import { createContext } from "@lit/context";

export type Bookmarks = string[];

export interface BookmarksPublicMethods {
  addBookmark: (videoId: string) => void;
  removeBookmark: (videoId: string) => void;
  resetBookmarks: () => void;
}

export const BOOKMARKS_INITIAL = [];

export const bookmarksMethodsContext = createContext<BookmarksPublicMethods>(
  "bookmarksMethodsContext"
);

export const bookmarksContext = createContext<Bookmarks>("bookmarksContext");
