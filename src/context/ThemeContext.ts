import { css, CSSResultGroup } from "lit";

import { createContext } from "@lit/context";

export enum ThemesEnum {
  Primary = "Primary",
}

export enum ThemeKeys {
  background = "background",
  foreground = "foreground",
  elementBackground = "elementBackground",
  elementAccent = "elementAccent",
  powerColor = "powerColor",
}

export interface Theme {
  [ThemeKeys.background]: CSSResultGroup;
  [ThemeKeys.foreground]: CSSResultGroup;
  [ThemeKeys.elementBackground]: CSSResultGroup;
  [ThemeKeys.elementAccent]: CSSResultGroup;
  [ThemeKeys.powerColor]: CSSResultGroup;
}

export const ACTIVE_THEME_INITIAL: ThemesEnum = ThemesEnum.Primary;

export const THEMES: Record<ThemesEnum, Theme> = {
  [ThemesEnum.Primary]: {
    background: css`#ffffff`,
    foreground: css`#7c7d75`,
    elementBackground: css`#fcf8d8`,
    elementAccent: css`#adaca7`,
    powerColor: css`#dd700b`,
  },
};

export const themeContext = createContext<ThemesEnum>("themeContext");

export const themeObjectContext = createContext<Theme>("themeObjectContext");
