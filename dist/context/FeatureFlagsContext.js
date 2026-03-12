import { createContext } from "@lit/context";
export var FeatureFlagEnum;
(function (FeatureFlagEnum) {
    FeatureFlagEnum["Bookmarking"] = "Bookmarking";
})(FeatureFlagEnum || (FeatureFlagEnum = {}));
export var FeatureFlagState;
(function (FeatureFlagState) {
    FeatureFlagState["On"] = "on";
    FeatureFlagState["Off"] = "off";
})(FeatureFlagState || (FeatureFlagState = {}));
export const FEATURE_FLAGS_INITIAL = {
    [FeatureFlagEnum.Bookmarking]: FeatureFlagState.Off,
};
export const featureFlagsMethodsContext = createContext("featureFlagsMethodsContext");
export const featureFlagsContext = createContext("featureFlagsContext");
