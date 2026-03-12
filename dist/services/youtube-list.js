import { API_KEY } from "../constants";
const YOUTUBE_LIST_URL = "https://www.googleapis.com/youtube/v3/videos";
export const getVideoListTask = async (component, [videoIds], signal) => {
    if (!videoIds.length)
        return;
    const paramsObject = {
        key: API_KEY,
        part: "statistics,snippet",
        id: videoIds.join(","),
    };
    const params = new URLSearchParams(paramsObject);
    const response = await fetch(`${YOUTUBE_LIST_URL}?${params.toString()}`, {
        signal,
    });
    if (!response.ok) {
        const data = await response.json();
        component._toastMethods?.dispatchToast({
            text: `Error occurred getting video statistics: ${response.status} - ${data?.error?.message ??
                response.statusText ??
                "An unknown error occurred."}`,
        });
        return;
    }
    const responseParsed = (await response.json());
    const responseModified = {
        ...responseParsed,
        items: responseParsed.items.map((item) => ({
            ...item,
            id: {
                videoId: item.id,
                kind: item.kind,
            },
        })),
    };
    return responseModified;
};
