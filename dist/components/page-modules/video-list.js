var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { consume } from "@lit/context";
import { Task } from "@lit/task";
import { universalStyles } from "../../common-styles";
import { bookmarksContext } from "../../context/BookmarksContext";
import { getVideoListTask, } from "../../services/youtube-list.js";
const NAME = "video-list";
let VideoList = class VideoList extends LitElement {
    constructor() {
        super(...arguments);
        this._commentCountMappedByVideoId = {};
        // TODO: Future improvement: Store pagination data and use it to infinite-scroll
        // if user hits the bottom
        this._getVideoListTask = new Task(this, {
            autoRun: false,
            task: async ([videoIds], { signal }) => {
                return await getVideoListTask(this, [videoIds], signal);
            },
        });
        this._batchAndCollectStatistics = async () => {
            this._commentCountMappedByVideoId = {};
            const processBatch = async (items, start, batchSize) => {
                if (!items || start >= items.length)
                    return;
                const batch = items.slice(start, start + batchSize);
                const videoIds = batch.map((v) => v.id.videoId);
                if (videoIds.length === 0)
                    return;
                (await this._getVideoListTask.run([videoIds]));
                const listResponse = this._getVideoListTask.value;
                this._commentCountMappedByVideoId = {
                    ...this._commentCountMappedByVideoId,
                    ...(listResponse?.items || []).reduce((obj, item) => {
                        obj[item.id.videoId] = item.statistics?.commentCount ?? "?";
                        return obj;
                    }, {}),
                };
                return processBatch(items, start + batchSize, batchSize);
            };
            const BATCH_SIZE = 50;
            processBatch(this?._items, 0, BATCH_SIZE);
        };
        this._handleArrows = (e) => {
            if (!this._items || this._items.length === 0)
                return;
            if (e.key === "ArrowDown") {
                e.preventDefault();
                if (!this._highlightedId) {
                    this._highlightedId = this._items[0]?.id.videoId || null;
                }
                else {
                    const curr = this._items.findIndex((v) => v.id.videoId === this._highlightedId);
                    const next = curr === -1 ? 0 : curr + 1;
                    if (next < this._items.length) {
                        this._highlightedId = this._items?.[next]?.id.videoId || null;
                    }
                    else {
                        this._highlightedId = this._items?.[0]?.id.videoId || null;
                    }
                }
            }
            if (e.key === "ArrowUp") {
                e.preventDefault();
                if (!this._highlightedId) {
                    this._highlightedId = this._items?.[0]?.id.videoId || null;
                }
                else {
                    const curr = this._items.findIndex((v) => v.id.videoId === this._highlightedId);
                    if (curr == null)
                        return;
                    const prev = curr > 0 ? curr - 1 : this._items.length - 1;
                    if (this._items[prev]) {
                        this._highlightedId = this._items[prev].id.videoId;
                    }
                }
            }
        };
    }
    static { this.styles = css `
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
  `; }
    updated(_changedProperties) {
        super.updated(_changedProperties);
        if (_changedProperties.has("_items")) {
            this._batchAndCollectStatistics();
            this._highlightedId = this._items?.[0]?.id?.videoId || null;
        }
    }
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        document.addEventListener("keydown", this._handleArrows);
    }
    render() {
        return html ` <div id="video-list-container" @keydown=${this._handleArrows}>
      ${repeat(this?._items || [], (v) => v.id, (v) => html `
            <video-item
              ._videoItem=${v}
              ._commentCount=${this._commentCountMappedByVideoId[v.id.videoId]}
              ._isBookmarked=${this._bookmarks?.includes(v.id.videoId)}
              ._isHighlighted=${this._highlightedId === v.id.videoId}
            ></video-item>
          `)}
    </div>`;
    }
};
__decorate([
    property({ attribute: false })
], VideoList.prototype, "_commentCountMappedByVideoId", void 0);
__decorate([
    property({ attribute: false })
], VideoList.prototype, "_items", void 0);
__decorate([
    consume({ context: bookmarksContext, subscribe: true }),
    property()
], VideoList.prototype, "_bookmarks", void 0);
__decorate([
    state()
], VideoList.prototype, "_highlightedId", void 0);
VideoList = __decorate([
    customElement(NAME)
], VideoList);
export { VideoList };
