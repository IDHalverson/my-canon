var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { provide } from "@lit/context";
import { FEATURE_FLAGS_INITIAL, featureFlagsContext, featureFlagsMethodsContext, } from "./FeatureFlagsContext.js";
const NAME = "feature-flags-context-wrapper";
let FeatureFlagsContextWrapper = class FeatureFlagsContextWrapper extends LitElement {
    constructor() {
        super(...arguments);
        // Feature Flags state context
        this._featureFlags = FEATURE_FLAGS_INITIAL;
        // Feature Flags methods context
        this._featureFlagsMethodsContext = {
            setFeatureFlag: (featureFlag, state) => {
                this._featureFlags = {
                    ...this._featureFlags,
                    [featureFlag]: state,
                };
            },
        };
    }
    render() {
        return html `<slot></slot>`;
    }
};
__decorate([
    provide({ context: featureFlagsContext }),
    property({ attribute: false })
], FeatureFlagsContextWrapper.prototype, "_featureFlags", void 0);
__decorate([
    provide({ context: featureFlagsMethodsContext }),
    property({ attribute: false })
], FeatureFlagsContextWrapper.prototype, "_featureFlagsMethodsContext", void 0);
FeatureFlagsContextWrapper = __decorate([
    customElement(NAME)
], FeatureFlagsContextWrapper);
export { FeatureFlagsContextWrapper };
