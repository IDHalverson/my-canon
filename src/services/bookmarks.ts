import { BOOKMARKS_LOCAL_STORAGE_KEY } from "../constants";

const replaceInStorage = (bookmarks: string) =>
  localStorage.setItem(BOOKMARKS_LOCAL_STORAGE_KEY, bookmarks);

const serializeBookmarks = (bookmarks: string[]) => {
  return bookmarks.join("|");
};

const deserializeBookmarks = (bookmarksString: string | null) => {
  return (bookmarksString || "")?.split("|");
};

export const retrieveBookmarks = () => {
  const bookmarksString = localStorage.getItem(BOOKMARKS_LOCAL_STORAGE_KEY);
  const bookmarks = deserializeBookmarks(bookmarksString || null);
  return bookmarks;
};

export const storeBookmark = (videoId: string) => {
  const bookmarks = retrieveBookmarks();
  if (!bookmarks.includes(videoId)) bookmarks?.unshift(videoId);
  replaceInStorage(serializeBookmarks(bookmarks));
};

export const removeBookmark = (videoId: string) => {
  let bookmarks = retrieveBookmarks();
  bookmarks = bookmarks.filter((bookmark) => bookmark !== videoId);
  replaceInStorage(serializeBookmarks(bookmarks));
};

export const deleteBookmarks = () => {
  replaceInStorage("");
};
