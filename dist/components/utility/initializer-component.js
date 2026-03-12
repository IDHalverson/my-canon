var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { consume } from "@lit/context";
import { FeatureFlagEnum, featureFlagsMethodsContext, FeatureFlagState, } from "../../context/FeatureFlagsContext.js";
import { toastMethodsContext, } from "../../context/ToastContext.js";
import { debugLog } from "../../utils/debugLog.js";
/** Better UX to wait a moment after initial page load before first toast appear. */
const INITIAL_DELAY_FOR_TOAST = 1000;
const NAME = "initializer-component";
let InitializerComponent = class InitializerComponent extends LitElement {
    firstUpdated(_changedProperties) {
        super.firstUpdated(_changedProperties);
        this.checkLocalStorageAvailabilityAndWarn();
    }
    checkLocalStorageAvailabilityAndWarn() {
        const isSupported = (getStorage) => {
            try {
                const key = "__test_local_storage_key";
                getStorage().setItem(key, key);
                getStorage().removeItem(key);
                return true;
            }
            catch (e) {
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
        }
        else {
            this._featureFlagMethods?.setFeatureFlag(FeatureFlagEnum.Bookmarking, FeatureFlagState.Off);
        }
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    consume({ context: toastMethodsContext, subscribe: true }),
    property({ attribute: false })
], InitializerComponent.prototype, "_toastMethods", void 0);
__decorate([
    consume({ context: featureFlagsMethodsContext, subscribe: true }),
    property({ attribute: false })
], InitializerComponent.prototype, "_featureFlagMethods", void 0);
InitializerComponent = __decorate([
    customElement(NAME)
], InitializerComponent);
export { InitializerComponent };
