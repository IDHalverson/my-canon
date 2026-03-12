import { createContext } from "@lit/context";

export enum FeatureFlagEnum {
  Bookmarking = "Bookmarking",
}

export enum FeatureFlagState {
  On = "on",
  Off = "off",
}

export type FeatureFlags = {
  [FeatureFlagEnum.Bookmarking]: FeatureFlagState;
};

export interface FeatureFlagsPublicMethods {
  setFeatureFlag: (
    featureFlag: FeatureFlagEnum,
    state: FeatureFlagState
  ) => void;
}

export const FEATURE_FLAGS_INITIAL: FeatureFlags = {
  [FeatureFlagEnum.Bookmarking]: FeatureFlagState.Off,
};

export const featureFlagsMethodsContext =
  createContext<FeatureFlagsPublicMethods>("featureFlagsMethodsContext");

export const featureFlagsContext = createContext<FeatureFlags>(
  "featureFlagsContext"
);
