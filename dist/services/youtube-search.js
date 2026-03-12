import { API_KEY, MAXIMUM_VIDEO_RESULTS } from "../constants";
import { INITIAL_USER_SELECTIONS, SortChoice, UserSelectionsKeys, } from "../context/UserSelectionsContext";
const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";
export var YoutubeSearchOrderEnum;
(function (YoutubeSearchOrderEnum) {
    YoutubeSearchOrderEnum["Date"] = "date";
    YoutubeSearchOrderEnum["Rating"] = "rating";
    YoutubeSearchOrderEnum["Relevance"] = "relevance";
})(YoutubeSearchOrderEnum || (YoutubeSearchOrderEnum = {}));
const SORT_CHOICE_TO_YOUTUBE_PARAM = {
    [SortChoice.Date]: YoutubeSearchOrderEnum.Date,
    [SortChoice.Rating]: YoutubeSearchOrderEnum.Rating,
    [SortChoice.Relevance]: YoutubeSearchOrderEnum.Relevance,
};
export const userSelectionsSearchTask = async (component, [searchTerm, sortChoice], signal) => {
    const paramsObject = {
        key: API_KEY,
        q: searchTerm ?? "",
        part: "snippet",
        maxResults: MAXIMUM_VIDEO_RESULTS,
        order: SORT_CHOICE_TO_YOUTUBE_PARAM[sortChoice ?? INITIAL_USER_SELECTIONS[UserSelectionsKeys.SortChoice]],
    };
    const params = new URLSearchParams(paramsObject);
    const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`, {
        signal,
    });
    if (!response.ok) {
        const data = await response.json();
        component._toastMethods?.dispatchToast({
            text: `Error occurred during search: ${response.status} - ${data?.error?.message ??
                response.statusText ??
                "An unknown error occurred."}`,
        });
        return;
    }
    const resp = (await response.json());
    // Filter these out for now because they cause bugs
    const modified = {
        ...resp,
        items: resp.items.filter((i) => !!i.id.videoId),
    };
    return modified;
};
