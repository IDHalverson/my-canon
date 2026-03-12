import { LitElement } from "lit";

import { API_KEY } from "../constants";
import { ToastPublicMethods } from "../context/ToastContext";

const YOUTUBE_LIST_URL = "https://www.googleapis.com/youtube/v3/videos";

export interface YoutubeListResponse_original {
  etag: string;
  kind: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: {
    etag: string;
    id: string;
    kind: string;
    statistics: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];
}

/** We transform the response so we can reuse components easier */
export interface YoutubeListResponse {
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: {
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    kind: string;
    statistics?: {
      viewCount: string;
      likeCount: string;
      favoriteCount: string;
      commentCount: string;
    };
  }[];
}

export interface YoutubeListParams {
  key: string;
  part: "statistics,snippet";
  id: string;
}

export const getVideoListTask = async <
  Component extends LitElement & { _toastMethods?: ToastPublicMethods }
>(
  component: Component,
  [videoIds]: [string[]],
  signal: AbortSignal
) => {
  if (!videoIds.length) return;
  const paramsObject: YoutubeListParams = {
    key: API_KEY,
    part: "statistics,snippet",
    id: videoIds.join(","),
  };
  const params = new URLSearchParams(
    paramsObject as unknown as Record<string, string>
  );
  const response = await fetch(`${YOUTUBE_LIST_URL}?${params.toString()}`, {
    signal,
  });
  if (!response.ok) {
    const data = await response.json();
    component._toastMethods?.dispatchToast({
      text: `Error occurred getting video statistics: ${response.status} - ${
        data?.error?.message ??
        response.statusText ??
        "An unknown error occurred."
      }`,
    });
    return;
  }
  const responseParsed =
    (await response.json()) as YoutubeListResponse_original;
  const responseModified = {
    ...responseParsed,
    items: responseParsed.items.map((item) => ({
      ...item,
      id: {
        videoId: item.id,
        kind: item.kind,
      },
    })),
  } as YoutubeListResponse;
  return responseModified;
};
