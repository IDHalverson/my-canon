import { css, html, LitElement, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

import { consume } from "@lit/context";
import { Task } from "@lit/task";

import { universalStyles } from "../../common-styles";
import { Bookmarks, bookmarksContext } from "../../context/BookmarksContext";
import {
  getVideoListTask,
  YoutubeListResponse,
} from "../../services/youtube-list.js";
import { YoutubeSearchResponse } from "../../services/youtube-search.js";

const NAME = "video-list";

@customElement(NAME)
export class VideoList extends LitElement {
  @property({ attribute: false })
  private _commentCountMappedByVideoId: Record<string, string> = {};

  @property({ attribute: false })
  private _items?:
    | YoutubeSearchResponse["items"]
    | YoutubeListResponse["items"];

  @consume({ context: bookmarksContext, subscribe: true })
  @property()
  private _bookmarks?: Bookmarks;

  @state()
  private _highlightedId?: string | null;

  static styles = css`
    :host {
      ${universalStyles}
    }
    #video-list-container {
      margin-top: 250px;
      max-width: 100vw;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      justify-content: center;
    }
  `;

  // TODO: Future improvement: Store pagination data and use it to infinite-scroll
  // if user hits the bottom

  private _getVideoListTask = new Task(this, {
    autoRun: false,
    task: async (
      [videoIds]: [string[]],
      { signal }
    ): Promise<YoutubeListResponse | undefined> => {
      return await getVideoListTask(this, [videoIds], signal);
    },
  });

  private _batchAndCollectStatistics = async () => {
    this._commentCountMappedByVideoId = {};
    const processBatch = async (
      items: YoutubeSearchResponse["items"] | undefined,
      start: number,
      batchSize: number
    ): Promise<void> => {
      if (!items || start >= items.length) return;
      const batch = items.slice(start, start + batchSize);
      const videoIds = batch.map((v) => v.id.videoId);
      if (videoIds.length === 0) return;
      (await this._getVideoListTask.run([videoIds])) as unknown as
        | YoutubeListResponse
        | undefined;
      const listResponse = this._getVideoListTask.value;
      this._commentCountMappedByVideoId = {
        ...this._commentCountMappedByVideoId,
        ...(listResponse?.items || []).reduce((obj, item) => {
          obj[item.id.videoId] = item.statistics?.commentCount ?? "?";
          return obj;
        }, {} as typeof this._commentCountMappedByVideoId),
      };
      return processBatch(items, start + batchSize, batchSize);
    };
    const BATCH_SIZE = 50;
    processBatch(this?._items, 0, BATCH_SIZE);
  };

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has("_items")) {
      this._batchAndCollectStatistics();
      this._highlightedId = this._items?.[0]?.id?.videoId || null;
    }
  }

  private _handleArrows = (e: KeyboardEvent) => {
    if (!this._items || this._items.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!this._highlightedId) {
        this._highlightedId = this._items[0]?.id.videoId || null;
      } else {
        const curr = this._items.findIndex(
          (v) => v.id.videoId === this._highlightedId
        );
        const next = curr === -1 ? 0 : curr + 1;
        if (next < this._items.length) {
          this._highlightedId = this._items?.[next]?.id.videoId || null;
        } else {
          this._highlightedId = this._items?.[0]?.id.videoId || null;
        }
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!this._highlightedId) {
        this._highlightedId = this._items?.[0]?.id.videoId || null;
      } else {
        const curr = this._items.findIndex(
          (v) => v.id.videoId === this._highlightedId
        );
        if (curr == null) return;
        const prev = curr > 0 ? curr - 1 : this._items.length - 1;
        if (this._items[prev]) {
          this._highlightedId = this._items[prev].id.videoId;
        }
      }
    }
  };

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    document.addEventListener("keydown", this._handleArrows);
  }

  render() {
    return html` <div id="video-list-container" @keydown=${this._handleArrows}>
      ${repeat(
        this?._items || [],
        (v) => v.id,
        (v) =>
          html`
            <video-item
              ._videoItem=${v}
              ._commentCount=${this._commentCountMappedByVideoId[v.id.videoId]}
              ._isBookmarked=${this._bookmarks?.includes(v.id.videoId)}
              ._isHighlighted=${this._highlightedId === v.id.videoId}
            ></video-item>
          `
      )}
    </div>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: VideoList;
  }
}
