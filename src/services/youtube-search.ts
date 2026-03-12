import { LitElement } from "lit";

import { API_KEY, MAXIMUM_VIDEO_RESULTS } from "../constants";
import { ToastPublicMethods } from "../context/ToastContext";
import {
  INITIAL_USER_SELECTIONS,
  SortChoice,
  UserSelections,
  UserSelectionsKeys,
} from "../context/UserSelectionsContext";

const YOUTUBE_SEARCH_URL = "https://www.googleapis.com/youtube/v3/search";

export interface YoutubeSearchResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: {
    kind: string;
    etag: string;
    id: {
      kind: string;
      videoId: string;
    };
    snippet?: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: {
          url: string;
          width: number;
          height: number;
        };
        medium: {
          url: string;
          width: number;
          height: number;
        };
        high: {
          url: string;
          width: number;
          height: number;
        };
      };
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
  }[];
}

export enum YoutubeSearchOrderEnum {
  Date = "date",
  Rating = "rating",
  Relevance = "relevance",
}

const SORT_CHOICE_TO_YOUTUBE_PARAM = {
  [SortChoice.Date]: YoutubeSearchOrderEnum.Date,
  [SortChoice.Rating]: YoutubeSearchOrderEnum.Rating,
  [SortChoice.Relevance]: YoutubeSearchOrderEnum.Relevance,
};

export interface YoutubeSearchParams {
  key: string;
  part: "snippet";
  q: string;
  order: YoutubeSearchOrderEnum;
  maxResults: number;
}

export const userSelectionsSearchTask = async <
  Component extends LitElement & { _toastMethods?: ToastPublicMethods }
>(
  component: Component,
  [searchTerm, sortChoice]: [
    UserSelections[UserSelectionsKeys.SearchTerm],
    UserSelections[UserSelectionsKeys.SortChoice] | undefined
  ],
  signal: AbortSignal
) => {
  const paramsObject: YoutubeSearchParams = {
    key: API_KEY,
    q: searchTerm ?? "",
    part: "snippet",
    maxResults: MAXIMUM_VIDEO_RESULTS,
    order:
      SORT_CHOICE_TO_YOUTUBE_PARAM[
        sortChoice ?? INITIAL_USER_SELECTIONS[UserSelectionsKeys.SortChoice]
      ],
  };
  const params = new URLSearchParams(
    paramsObject as unknown as Record<string, string>
  );
  const response = await fetch(`${YOUTUBE_SEARCH_URL}?${params.toString()}`, {
    signal,
  });
  if (!response.ok) {
    const data = await response.json();
    component._toastMethods?.dispatchToast({
      text: `Error occurred during search: ${response.status} - ${
        data?.error?.message ??
        response.statusText ??
        "An unknown error occurred."
      }`,
    });
    return;
  }
  const resp = (await response.json()) as YoutubeSearchResponse;
  // Filter these out for now because they cause bugs
  const modified = {
    ...resp,
    items: resp.items.filter((i) => !!i.id.videoId),
  };
  return modified;
};
