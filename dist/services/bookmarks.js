import { BOOKMARKS_LOCAL_STORAGE_KEY } from "../constants";
const replaceInStorage = (bookmarks) => localStorage.setItem(BOOKMARKS_LOCAL_STORAGE_KEY, bookmarks);
const serializeBookmarks = (bookmarks) => {
    return bookmarks.join("|");
};
const deserializeBookmarks = (bookmarksString) => {
    return (bookmarksString || "")?.split("|");
};
export const retrieveBookmarks = () => {
    const bookmarksString = localStorage.getItem(BOOKMARKS_LOCAL_STORAGE_KEY);
    const bookmarks = deserializeBookmarks(bookmarksString || null);
    return bookmarks;
};
export const storeBookmark = (videoId) => {
    const bookmarks = retrieveBookmarks();
    if (!bookmarks.includes(videoId))
        bookmarks?.unshift(videoId);
    replaceInStorage(serializeBookmarks(bookmarks));
};
export const removeBookmark = (videoId) => {
    let bookmarks = retrieveBookmarks();
    bookmarks = bookmarks.filter((bookmark) => bookmark !== videoId);
    replaceInStorage(serializeBookmarks(bookmarks));
};
export const deleteBookmarks = () => {
    replaceInStorage("");
};
