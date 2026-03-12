import { html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";

import { provide } from "@lit/context";

import {
  FEATURE_FLAGS_INITIAL,
  FeatureFlags,
  featureFlagsContext,
  featureFlagsMethodsContext,
  FeatureFlagsPublicMethods,
} from "./FeatureFlagsContext.js";

const NAME = "feature-flags-context-wrapper";

@customElement(NAME)
export class FeatureFlagsContextWrapper extends LitElement {
  // Feature Flags state context
  @provide({ context: featureFlagsContext })
  @property({ attribute: false })
  protected _featureFlags: FeatureFlags = FEATURE_FLAGS_INITIAL;

  // Feature Flags methods context
  @provide({ context: featureFlagsMethodsContext })
  @property({ attribute: false })
  protected _featureFlagsMethodsContext: FeatureFlagsPublicMethods = {
    setFeatureFlag: (featureFlag, state) => {
      this._featureFlags = {
        ...this._featureFlags,
        [featureFlag]: state,
      };
    },
  };

  render() {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    [NAME]: FeatureFlagsContextWrapper;
  }
}
