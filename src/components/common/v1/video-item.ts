import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { property } from "lit/decorators.js";
import { customElement } from "lit/decorators/custom-element.js";

import { consume } from "@lit/context";

import { YOUTUBE_LINK_TEMPLATE } from "../../../constants";
import {
  bookmarksMethodsContext,
  BookmarksPublicMethods,
} from "../../../context/BookmarksContext";
import {
  FeatureFlagEnum,
  FeatureFlags,
  featureFlagsContext,
} from "../../../context/FeatureFlagsContext";
import { YoutubeSearchResponse } from "../../../services/youtube-search";

const NAME = "video-item";

@customElement(NAME)
export class VideoItem extends LitElement {
  @property({ attribute: false })
  private _videoItem?: YoutubeSearchResponse["items"][number];

  @property({ attribute: false })
  private _commentCount?: string;

  @consume({ context: featureFlagsContext, subscribe: true })
  @property()
  private _featureFlags?: FeatureFlags;

  @consume({ context: bookmarksMethodsContext })
  @property()
  private _bookmarksMethodsContext?: BookmarksPublicMethods;

  @property()
  private _isBookmarked: boolean = false;

  @property()
  private _isHighlighted: boolean = false;

  static styles = css`
    .video-item-container {
      display: flex;
      flex-flow: row wrap;
      align-items: center;
      justify-content: center;
      max-width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      margin-left: max(20px, 7%);
      margin-right: max(20px, 7%);
      box-shadow: 3px 3px 10px lightgray;
      padding: 3%;
    }

    .video-item-container.highlighted {
      border: 2px solid var(--powerColor);
    }

    .video-item-thumbnail-image {
      max-width: 240px;
      min-width: 240px;
      max-height: 135px;
      min-height: 135px;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .video-item-details-container {
      margin: 0px 20px;
      overflow: hidden;
    }

    .video-item-title {
      font-weight: bold;
      padding-bottom: 10px;
    }

    .video-item-title a {
      cursor: pointer;
      color: black;
      text-decoration: none;
    }

    .video-item-description {
      padding-bottom: 10px;
      max-width: 50vw;
    }

    .video-item-description span {
      color: black;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
      text-decoration: none;
    }

    .video-item-total-comments {
      font-weight: bold;
    }

    .video-item-bookmarking {
      font-weight: bold;
      cursor: pointer;
      &:hover {
        background: rgba(0, 0, 0, 0.1);
      }
    }
  `;

  protected _handleClickBookmark = () => {
    if (this._videoItem?.id.videoId) {
      if (this._isBookmarked) {
        this._bookmarksMethodsContext?.removeBookmark(
          this._videoItem?.id.videoId
        );
      } else {
        this._bookmarksMethodsContext?.addBookmark(this._videoItem?.id.videoId);
      }
    }
  };

  protected updated(_changedProperties: PropertyValues): void {
    super.updated(_changedProperties);
    if (_changedProperties.has("_isHighlighted") && this._isHighlighted) {
      this.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }

  render() {
    if (!this._videoItem) return nothing;
    const link = YOUTUBE_LINK_TEMPLATE.replace(
      "$id",
      this._videoItem.id.videoId
    );
    return html`
      <div
        class="video-item-container ${this._isHighlighted ? "highlighted" : ""}"
      >
        <div class="video-item-thumbnail-image">
          <img
            src="${this._videoItem.snippet?.thumbnails.medium.url}"
            loading="lazy"
            alt="Video thumbnail"
          />
        </div>
        <div class="video-item-details-container">
          <div class="video-item-title">
            <a
              href="${link}"
              aria-describedby="Click to open the video in YouTube"
              aria-label="Video Title"
              >${this._videoItem.snippet?.title}</a
            >
          </div>
          <div class="video-item-description" aria-label="Video Description">
            ${this._videoItem.snippet?.description}
            <a
              href="${link}"
              aria-label="See More button"
              aria-describedby="See more of the description by clicking to visit YouTube.com"
            >
              ${this._videoItem.snippet?.description?.endsWith("...")
                ? html`<span>[read more]</span>`
                : ""}
            </a>
          </div>
          <div class="video-item-total-comments">
            Total Comments: ${this._commentCount ?? "?"}
          </div>
          ${this._featureFlags?.[FeatureFlagEnum.Bookmarking]
            ? html`<div
                aria-label="Bookmarked Status"
                aria-describedby="Click to bookmark or unbookmark this video"
                class="video-item-bookmarking"
                @click=${this._handleClickBookmark}
              >
                Bookmarked: ${this._isBookmarked ? html`✅` : html``}
              </div>`
            : html``}
        </div>
      </div>
    `;
  }
}

/**
           {totalCommentCount.value === 100
            ? `${totalCommentCount.value}+`
            : totalCommentCount.value ?? "(Loading comment count..."}
 */

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: VideoItem;
  }
}
