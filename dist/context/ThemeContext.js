import { css } from "lit";
import { createContext } from "@lit/context";
export var ThemesEnum;
(function (ThemesEnum) {
    ThemesEnum["Primary"] = "Primary";
})(ThemesEnum || (ThemesEnum = {}));
export var ThemeKeys;
(function (ThemeKeys) {
    ThemeKeys["background"] = "background";
    ThemeKeys["foreground"] = "foreground";
    ThemeKeys["elementBackground"] = "elementBackground";
    ThemeKeys["elementAccent"] = "elementAccent";
    ThemeKeys["powerColor"] = "powerColor";
})(ThemeKeys || (ThemeKeys = {}));
export const ACTIVE_THEME_INITIAL = ThemesEnum.Primary;
export const THEMES = {
    [ThemesEnum.Primary]: {
        background: css `#ffffff`,
        foreground: css `#7c7d75`,
        elementBackground: css `#fcf8d8`,
        elementAccent: css `#adaca7`,
        powerColor: css `#dd700b`,
    },
};
export const themeContext = createContext("themeContext");
export const themeObjectContext = createContext("themeObjectContext");
