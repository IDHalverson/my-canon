import { html, LitElement, PropertyValues } from "lit";
import { customElement, property } from "lit/decorators.js";

import { consume } from "@lit/context";

import {
  FeatureFlagEnum,
  featureFlagsMethodsContext,
  FeatureFlagsPublicMethods,
  FeatureFlagState,
} from "../../context/FeatureFlagsContext.js";
import {
  toastMethodsContext,
  ToastPublicMethods,
} from "../../context/ToastContext.js";
import { debugLog } from "../../utils/debugLog.js";

/** Better UX to wait a moment after initial page load before first toast appear. */
const INITIAL_DELAY_FOR_TOAST = 1000;

const NAME = "initializer-component";

@customElement(NAME)
export class InitializerComponent extends LitElement {
  @consume({ context: toastMethodsContext, subscribe: true })
  @property({ attribute: false })
  private _toastMethods?: ToastPublicMethods;

  @consume({ context: featureFlagsMethodsContext, subscribe: true })
  @property({ attribute: false })
  private _featureFlagMethods?: FeatureFlagsPublicMethods;

  protected firstUpdated(_changedProperties: PropertyValues): void {
    super.firstUpdated(_changedProperties);
    this.checkLocalStorageAvailabilityAndWarn();
  }

  checkLocalStorageAvailabilityAndWarn(): void {
    const isSupported: (getStorage: () => Storage) => boolean = (
      getStorage
    ) => {
      try {
        const key = "__test_local_storage_key";
        getStorage().setItem(key, key);
        getStorage().removeItem(key);
        return true;
      } catch (e: unknown) {
        debugLog(`Local Storage is not supported. Error: ${e}`);
        return false;
      }
    };

    const localStorageIsSupported = isSupported(() => localStorage);

    // Warn user if localStorage is not supported
    if (!localStorageIsSupported) {
      setTimeout(() => {
        this._toastMethods?.dispatchToast({
          text: "Local Storage is not accessible. Some features will be disabled.",
        });
      }, INITIAL_DELAY_FOR_TOAST);
    } else {
      this._featureFlagMethods?.setFeatureFlag(
        FeatureFlagEnum.Bookmarking,
        FeatureFlagState.Off
      );
    }
  }

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: InitializerComponent;
  }
}
